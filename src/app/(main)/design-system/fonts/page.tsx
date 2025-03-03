import React from "react";

const FontDemo: React.FC = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-4">
        <h1 className="text-2xl font-thin underline">
          Heading 1 - Font Thin, Underlined, 2xl
        </h1>
        <h1 className="text-4xl font-light line-through">
          Heading 1 - Font Light, Strikethrough, 4xl
        </h1>
        <h1 className="text-6xl font-normal italic">
          Heading 1 - Font Normal, Italic, 6xl
        </h1>
        <h1 className="text-8xl font-medium">Heading 1 - Font Medium, 8xl</h1>
        <h1 className="text-9xl font-semibold">
          Heading 1 - Font Semibold, 9xl
        </h1>
        <h1 className="text-10xl font-bold">Heading 1 - Font Bold, 10xl</h1>
        <h1 className="text-12xl font-extrabold">
          Heading 1 - Font Extrabold, 12xl
        </h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-thin underline">
          Heading 2 - Font Thin, Underlined, xl
        </h2>
        <h2 className="text-3xl font-light line-through">
          Heading 2 - Font Light, Strikethrough, 3xl
        </h2>
        <h2 className="text-5xl font-normal italic">
          Heading 2 - Font Normal, Italic, 5xl
        </h2>
        <h2 className="text-7xl font-medium">Heading 2 - Font Medium, 7xl</h2>
        <h2 className="text-8xl font-semibold">
          Heading 2 - Font Semibold, 8xl
        </h2>
        <h2 className="text-9xl font-bold">Heading 2 - Font Bold, 9xl</h2>
        <h2 className="text-11xl font-extrabold">
          Heading 2 - Font Extrabold, 11xl
        </h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-thin underline">
          Heading 3 - Font Thin, Underlined, base
        </h3>
        <h3 className="text-xl font-light line-through">
          Heading 3 - Font Light, Strikethrough, xl
        </h3>
        <h3 className="text-2xl font-normal italic">
          Heading 3 - Font Normal, Italic, 2xl
        </h3>
        <h3 className="text-4xl font-medium">Heading 3 - Font Medium, 4xl</h3>
        <h3 className="text-5xl font-semibold">
          Heading 3 - Font Semibold, 5xl
        </h3>
        <h3 className="text-6xl font-bold">Heading 3 - Font Bold, 6xl</h3>
        <h3 className="text-8xl font-extrabold">
          Heading 3 - Font Extrabold, 8xl
        </h3>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-thin underline">
          Heading 4 - Font Thin, Underlined, sm
        </h4>
        <h4 className="text-base font-light line-through">
          Heading 4 - Font Light, Strikethrough, base
        </h4>
        <h4 className="text-xl font-normal italic">
          Heading 4 - Font Normal, Italic, xl
        </h4>
        <h4 className="text-2xl font-medium">Heading 4 - Font Medium, 2xl</h4>
        <h4 className="text-3xl font-semibold">
          Heading 4 - Font Semibold, 3xl
        </h4>
        <h4 className="text-4xl font-bold">Heading 4 - Font Bold, 4xl</h4>
        <h4 className="text-6xl font-extrabold">
          Heading 4 - Font Extrabold, 6xl
        </h4>
      </div>

      <div className="space-y-4">
        <h5 className="text-xs font-thin underline">
          Heading 5 - Font Thin, Underlined, xs
        </h5>
        <h5 className="text-sm font-light line-through">
          Heading 5 - Font Light, Strikethrough, sm
        </h5>
        <h5 className="text-base font-normal italic">
          Heading 5 - Font Normal, Italic, base
        </h5>
        <h5 className="text-xl font-medium">Heading 5 - Font Medium, xl</h5>
        <h5 className="text-2xl font-semibold">
          Heading 5 - Font Semibold, 2xl
        </h5>
        <h5 className="text-3xl font-bold">Heading 5 - Font Bold, 3xl</h5>
        <h5 className="text-5xl font-extrabold">
          Heading 5 - Font Extrabold, 5xl
        </h5>
      </div>

      <div className="space-y-4">
        <h6 className="text-2xs font-thin underline">
          Heading 6 - Font Thin, Underlined, 2xs
        </h6>
        <h6 className="text-xs font-light line-through">
          Heading 6 - Font Light, Strikethrough, xs
        </h6>
        <h6 className="text-sm font-normal italic">
          Heading 6 - Font Normal, Italic, sm
        </h6>
        <h6 className="text-base font-medium">Heading 6 - Font Medium, base</h6>
        <h6 className="text-lg font-semibold">Heading 6 - Font Semibold, lg</h6>
        <h6 className="text-xl font-bold">Heading 6 - Font Bold, xl</h6>
        <h6 className="text-2xl font-extrabold">
          Heading 6 - Font Extrabold, 2xl
        </h6>
      </div>
    </div>
  );
};

export default FontDemo;
