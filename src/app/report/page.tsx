'use client';

import { useActionState, useState, ChangeEvent } from 'react';
import { reportFoundItem } from '../actions/item';

const initialState = {
    error: '',
};

export default function ReportItemPage() {
    const [state, formAction, isPending] = useActionState(reportFoundItem, initialState);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setFileName(null);
            setPreviewUrl(null);
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
            <div className="card">
                <h1 className="text-gradient h2" style={{ marginBottom: '1rem' }}>Report Found Item</h1>
                <p style={{ color: 'hsl(var(--color-text-secondary))', marginBottom: '2rem' }}>
                    Please fill in the details of the item found. Accurate descriptions help verify ownership.
                </p>

                {state?.error && (
                    <div style={{
                        backgroundColor: 'hsl(var(--color-error))',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        {state.error}
                    </div>
                )}

                <form action={formAction} style={{ display: 'grid', gap: '1.5rem' }}>
                    {/* Item Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Item Name</label>
                            <input
                                name="name"
                                required
                                placeholder="e.g. Blue Umbrella"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                            <select
                                name="category"
                                required
                                defaultValue=""
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="documents">Documents/IDs</option>
                                <option value="clothing">Clothing/Accessories</option>
                                <option value="bags">Bags/Wallets</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            placeholder="Describe distinguishing features (do not describe contents)"
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    {/* Location & Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Date Found</label>
                            <input
                                type="date"
                                name="dateFound"
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Time Found</label>
                            <input
                                type="time"
                                name="timeFound"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Location Found</label>
                        <input
                            name="location"
                            required
                            placeholder="e.g. Terminal A, Bus 101, Waiting Area"
                        />
                    </div>

                    {/* Transport Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Transport Type</label>
                            <select
                                name="transportType"
                                required
                                defaultValue="bus"
                            >
                                <option value="bus">Bus</option>
                                <option value="jeepney">Jeepney</option>
                                <option value="tricycle">Tricycle</option>
                                <option value="terminal">Terminal Premises</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Vehicle Plate No.</label>
                            <input
                                name="routeNumber"
                                placeholder="e.g. ABC-123"
                            />
                        </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Upload Photo</label>
                        <div style={{
                            border: '2px dashed hsl(var(--color-border))',
                            borderRadius: 'var(--radius-md)',
                            padding: '2rem 1rem',
                            textAlign: 'center',
                            backgroundColor: 'hsl(var(--color-surface-hover))',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            borderColor: previewUrl ? 'hsl(var(--color-primary))' : 'hsl(var(--color-border))'
                        }}>
                            {previewUrl ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: 'var(--radius-md)', objectFit: 'contain' }} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'hsl(var(--color-primary))' }}>✓ {fileName}</span>
                                        <button type="button" onClick={() => { setPreviewUrl(null); setFileName(null); }} style={{ background: 'none', border: 'none', color: 'hsl(var(--color-error))', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Remove</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
                                    <span style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem' }}>Click to select a file (Optional)</span>
                                </>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap-reverse' }}>
                        <button type="button" className="btn" style={{ flex: '1 1 120px', border: '1px solid hsl(var(--color-border))' }} onClick={() => window.history.back()}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: '2 1 200px' }} disabled={isPending}>
                            {isPending ? 'Registering...' : 'Register Found Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
