'use client';

import { useActionState } from 'react';
import { submitClaimRequest } from '../../actions/claim';

const initialState = {
    error: '',
};

export default function ClaimForm({ item }: { item: any }) {
    const [state, formAction, isPending] = useActionState(submitClaimRequest, initialState);

    return (
        <form action={formAction} style={{ display: 'grid', gap: '1.5rem' }}>
            <input type="hidden" name="itemId" value={item.id} />

            {state?.error && (
                <div style={{ backgroundColor: 'hsl(var(--color-error))', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    {state.error}
                </div>
            )}

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>When did you lose it?</label>
                <input
                    type="date"
                    name="dateLost"
                    required
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Proof of Ownership / Description</label>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-secondary))', marginBottom: '0.75rem' }}>
                    Please describe unique details not visible in the photo (e.g. content of wallet, serial number, scratch marks).
                </p>
                <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="E.g. The wallet contains an ID with name 'John Doe'..."
                    style={{ resize: 'vertical' }}
                />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit Claim Request'}
            </button>
        </form>
    );
}
