import React, { useState } from 'react';

const CodeReviewer = () => {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReview = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setReview('');
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/ai/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt : code}),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setReview(data.response || '✅ No issues found!');

    } catch (err) {
      setError(err.message || 'Failed to fetch AI review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900 text-white font-sans">
      
      {/* Left - Code Input */}
      <div className="p-6 flex flex-col h-full border-r border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">📝 Code Editor</h2>

        <div className="flex-grow bg-[#1e1e1e] rounded-lg p-4 shadow-inner border border-gray-700">
          <textarea
            className="w-full h-full resize-none bg-transparent text-sm text-green-300 font-mono outline-none"
            placeholder="// Write your code here..."
            name="codeInput"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleReview}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Reviewing...' : '🚀 Review Code'}
        </button>
      </div>

      {/* Right - AI Review Output */}
      <div className="p-6 h-full overflow-auto bg-[#121212]">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">🤖 AI Review</h2>

        <div className="bg-[#1e1e1e] rounded-lg p-4 shadow-inner border border-gray-700 text-sm font-mono text-white whitespace-pre-wrap">
          {loading && <p className="text-blue-400">Analyzing your code...</p>}
          {error && <p className="text-red-500">❌ {error}</p>}
          {!loading && !error && review && <p>{review}</p>}
          {!loading && !error && !review && (
            <p className="text-gray-400 italic">AI feedback will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeReviewer;
