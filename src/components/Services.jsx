import { useState } from 'react'

function Services() {
    // offset state controls how far the inner div moves vertically (in pixels)
    const [offset, setOffset] = useState(0);

    // Increase offset to move the inner div down.
    const increaseOffset = () => setOffset((prev) => prev + 20);
    // Decrease offset (ensuring it doesn't go below 0) to move the inner div up.
    const decreaseOffset = () => setOffset((prev) => Math.max(prev - 20, 0));

    return (
        <div className="border border-gray-500 p-4">
            {/* Outer container: fixed height to simulate a frame */}
            <div className="relative bg-gray-100 h-[300px] overflow-visible">
                {/* Inner div: fixed height (100px) that moves vertically via margin-top */}
                <div
                    className="h-[100px] bg-blue-200 transition-all duration-300"
                    style={{ marginTop: `${offset}px` }}
                >
                    <p className="text-center">Inner Div (100px tall)</p>
                </div>
            </div>

            {/* Additional content that is placed below the moving inner div */}
            <div className="mt-4">
                <p>Additional content that will be pushed down as the inner div moves.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
                <p>This content might eventually get pushed out of the frame.</p>
            </div>

            {/* Controls for demonstration */}
            <div className="mt-4 flex gap-2">
                <button
                    onClick={decreaseOffset}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Move Up
                </button>
                <button
                    onClick={increaseOffset}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Move Down
                </button>
            </div>
        </div>
    );
}

export default Services
