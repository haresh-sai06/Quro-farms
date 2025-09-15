// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vskgzkqgktiypkpxvprw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZza2d6a3Fna3RpeXBrcHh2cHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1ODExMzMsImV4cCI6MjA3MzE1NzEzM30._lR_closxAZklNOklGjapJ6rgCXeWgneCYMkdzre160";

export const supabase = createClient(supabaseUrl, supabaseKey);
