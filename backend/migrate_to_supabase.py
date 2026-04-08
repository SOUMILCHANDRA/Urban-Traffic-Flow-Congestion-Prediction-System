import pandas as pd
import json
import os
from supabase import create_client
from dotenv import load_dotenv

# Load local environment variables with absolute path logic
base_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(base_dir, '..', '.env')
load_dotenv(env_path)

print(f"DEBUG: Looking for .env at: {os.path.abspath(env_path)}")
print(f"DEBUG: File exists: {os.path.exists(env_path)}")

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env")
    exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def migrate_stats():
    print("Migrating Traffic Stats...")
    try:
        df = pd.read_csv("pune_traffic_stats.csv")
        data = df.to_dict(orient="records")
        
        # Cleanup old data to stay under 150MB
        supabase.table("traffic_stats").delete().neq("id", 0).execute()
        
        # Push in batches
        for i in range(0, len(data), 100):
            batch = data[i:i+100]
            supabase.table("traffic_stats").insert(batch).execute()
        print("✅ Stats Migration Complete.")
    except Exception as e:
        print(f"❌ Stats Error: {e}")

def migrate_trips():
    print("Migrating Trips...")
    try:
        with open("pune_trips.json", "r") as f:
            data = json.load(f)
        
        # Cleanup old data
        supabase.table("trips").delete().neq("id", 0).execute()
        
        # Insert trips
        # Note: If JSON is too large, we might need to batch it, but 2.4MB is usually fine for one insert
        supabase.table("trips").insert(data).execute()
        print("✅ Trips Migration Complete.")
    except Exception as e:
        print(f"❌ Trips Error: {e}")

if __name__ == "__main__":
    print(f"Starting Cloud Migration (Target: {SUPABASE_URL})")
    migrate_stats()
    migrate_trips()
    print("🚀 Cloud Pulse Matrix fully synchronized.")
