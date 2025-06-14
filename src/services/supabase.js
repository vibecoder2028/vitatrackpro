import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for database operations
export const vitaTrackAPI = {
  // SPGs
  async getSPGs() {
    const { data, error } = await supabase
      .from('spgs')
      .select(`
        *,
        region:regions(name),
        stores(count)
      `)
      .eq('is_active', true)
    return { data, error }
  },

  // Stores
  async getStores() {
    const { data, error } = await supabase
      .from('stores')
      .select(`
        *,
        spg:spgs(name),
        region:regions(name)
      `)
      .eq('is_active', true)
    return { data, error }
  },

  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(name),
        supplier:suppliers(name)
      `)
      .eq('is_active', true)
    return { data, error }
  },

  // Sales Transactions
  async getSalesTransactions(limit = 50) {
    const { data, error } = await supabase
      .from('sales_transactions')
      .select(`
        *,
        store:stores(name),
        spg:spgs(name)
      `)
      .order('transaction_date', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Payouts
  async getPayouts() {
    const { data, error } = await supabase
      .from('payouts')
      .select(`
        *,
        spg:spgs(name, bank_account_number)
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}