import React from 'react';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockIcon } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks'; // Import createBlock directly
import '@wordpress/block-library/build-style/style.css';
import './GutenbergEditor.css'; // Custom CSS

const CustomInserter = () => {
  // Get all available blocks
  const blocks = useSelect((select) =>
    select('core/blocks').getBlockTypes()
  );

  // Get insertBlock function from the dispatch
  const { insertBlock } = useDispatch('core/block-editor');

  return (
    <div className="inserter-panel">
      <h4>Insert Block</h4>
      <div className="inserter-grid">
        {blocks.map((block) => (
          <button
            key={block.name}
            onClick={() => {
              const newBlock = createBlock(block.name); // Create a new block instance
              console.log('Created Block:', newBlock); // Log the created block
              const inserted = insertBlock(newBlock); // Insert the block into the editor
              console.log('Block inserted:', inserted); // Log the result of block insertion
            }}
          >
            <BlockIcon icon={block.icon} />
            <span>{block.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomInserter;
