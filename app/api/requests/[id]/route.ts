import { NextRequest, NextResponse } from 'next/server';
import { getRequestById, updateRequest, deleteRequest } from '@/lib/db';

// GET /api/requests/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const request = await getRequestById(params.id);
    if (!request) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ request });
  } catch (err) {
    console.error('[GET /api/requests/:id]', err);
    return NextResponse.json({ error: 'Failed to fetch request' }, { status: 500 });
  }
}

// PATCH /api/requests/[id] — partial update (status, notes, etc.)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Allow updating only safe fields
    const allowed = ['status', 'notes', 'category', 'priority', 'aiSummary', 'aiSuggestedReply'];
    const patch: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) patch[key] = body[key];
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    // Validate status if provided
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (patch.status && !validStatuses.includes(patch.status as string)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const updated = await updateRequest(params.id, patch as Parameters<typeof updateRequest>[1]);
    return NextResponse.json({ request: updated });
  } catch (err) {
    console.error('[PATCH /api/requests/:id]', err);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

// DELETE /api/requests/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteRequest(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/requests/:id]', err);
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
  }
}
