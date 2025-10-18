import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Fetch all background images
export async function GET() {
  
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('background_images')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new background image
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { image_url } = await request.json()

    if (!image_url) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // Use admin client for write operations to bypass RLS
    // First, deactivate all existing background images
    await supabaseAdmin
      .from('background_images')
      .update({ is_active: false })
      .neq('id', '00000000-0000-0000-0000-000000000000') // Update all records

    // Then create the new active background image
    const { data, error } = await supabaseAdmin
      .from('background_images')
      .insert([{ image_url, is_active: true }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update background positioning settings
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 })
    }

    const { position, size, repeat, horizontalPosition, verticalPosition } = await request.json()

    // Update background positioning in the active background image record
    const { data, error } = await supabaseAdmin
      .from('background_images')
      .update({ 
        background_position: position,
        horizontal_position: horizontalPosition,
        vertical_position: verticalPosition,
        background_size: size,
        background_repeat: repeat,
        updated_at: new Date().toISOString()
      })
      .eq('is_active', true)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

// DELETE - Delete background image
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 })
    }

    // Use admin client for write operations to bypass RLS
    const { error } = await supabaseAdmin
      .from('background_images')
      .delete()
      .eq('is_active', true)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
