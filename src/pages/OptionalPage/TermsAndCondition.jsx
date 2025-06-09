import React from 'react';

const TermsAndCondition = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
            <p className="mb-4">
                By using our platform, you agree to the following terms and conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 13 years old to register or use this site.</li>
                <li>All content shared must be your original work or properly credited.</li>
                <li>We reserve the right to remove any inappropriate or offensive content.</li>
                <li>Your personal data will be handled securely in compliance with applicable privacy laws.</li>
                <li>We may update these terms at any time. Users will be notified of significant changes.</li>
            </ul>
            <p className="mt-6 text-base">
                For any clarification, feel free to contact us.
            </p>
        </div>
    );
};

export default TermsAndCondition;