import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

export function useStrategyData() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [strategyDoc, setStrategyDoc] = useState(null);
  const [error, setError] = useState(null);

  // Get user id by email stored in localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      const fetchUserId = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();
        if (data) setUserId(data.id);
        else console.error("User fetch error:", error);
      };
      fetchUserId();
    }
  }, []);

  // Fetch latest strategy document for user
  useEffect(() => {
    if (!userId) return;
    const fetchDoc = async () => {
      const { data, error } = await supabase
        .from("product_strategy_documents")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") setError(error.message);
      setStrategyDoc(data || null);
      setLoading(false);
    };
    fetchDoc();
  }, [userId]);

  // Create new strategy doc
  const createStrategy = async (productName, author) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("product_strategy_documents")
      .insert([{ user_id: userId, product_name: productName, author }])
      .select()
      .single();
    if (error) setError(error.message);
    else setStrategyDoc(data);
  };

  // Generic update (for any table)
  const updateSection = async (table, id, values) => {
    const { data, error } = await supabase
      .from(table)
      .update(values)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  // Generic insert (for any section)
  const insertSection = async (table, values) => {
    const { data, error } = await supabase
      .from(table)
      .insert([{ ...values, user_id: userId, strategy_id: strategyDoc.id }])
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  // Delete a section record
  const deleteSection = async (table, id) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
  };

  return {
    userId,
    strategyDoc,
    loading,
    error,
    createStrategy,
    insertSection,
    updateSection,
    deleteSection,
  };
}
