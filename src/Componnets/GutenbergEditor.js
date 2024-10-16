import React, { useState, useEffect } from 'react';
import {
  BlockEditorProvider,
  BlockList,
  WritingFlow,
  ObserveTyping,
  Inserter,
  InspectorControls,
  BlockToolbar,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { registerCoreBlocks } from '@wordpress/block-library';
import { serialize } from '@wordpress/blocks';
import {
  SlotFillProvider,
  DropZoneProvider,
  Button,
  PanelBody,
  ToolbarGroup,
  ToolbarButton,
  TextControl,
} from '@wordpress/components';
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css'; // Block library styles for core blocks including Embed blocks
import './GutenbergEditor.css';

const GutenbergEditor = () => {
  const [blocks, setBlocks] = useState([]);
  const [title, setTitle] = useState('');

  const { selectedBlock, hasSelectedBlock } = useSelect((select) => ({
    selectedBlock: select('core/block-editor').getSelectedBlock(),
    hasSelectedBlock: select('core/block-editor').hasSelectedBlock(),
  }), []);

  const dispatch = useDispatch();

  useEffect(() => {
    registerCoreBlocks(); // Register core Gutenberg blocks including Embeds
  }, []);

  const handleSave = () => {
    if (!title) {
      alert('Please enter a title.');
      return;
    }

    const content = serialize(blocks); // Serialize blocks to HTML

    // Save the content to your backend server
    fetch('http://localhost:5000/savePageContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save content');
        }
        return response.json();
      })
      .then((data) => {
        alert('Page saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving content:', error);
        alert('Failed to save content.');
      });
  };

  const updateBlockAttributes = (attrKey, value) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.clientId === selectedBlock.clientId
          ? {
              ...block,
              attributes: {
                ...block.attributes,
                [attrKey]: value,
              },
            }
          : block
      )
    );
  };

  return (
    <div className="gutenberg-editor-container">
      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider value={blocks} onInput={setBlocks} onChange={setBlocks} settings={{ hasFixedToolbar: true }}>
            {/* Top Toolbar */}
            <div className="editor-toolbar">
              <input
                className="editor-title-input"
                type="text"
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Inserter className="inserter-button" />
              <Button isPrimary className="save-button" onClick={handleSave}>
                Publish
              </Button>
            </div>

            <div className="editor-layout">
              {/* Sidebar for block settings */}
              <div className="editor-sidebar">
                {hasSelectedBlock && selectedBlock ? (
                  <InspectorControls>
                    <PanelBody title="Block Settings" initialOpen={true}>
                      {Object.entries(selectedBlock.attributes).map(([attrKey, attrValue]) => (
                        <TextControl
                          key={attrKey}
                          label={attrKey}
                          value={attrValue}
                          onChange={(value) => updateBlockAttributes(attrKey, value)}
                        />
                      ))}
                    </PanelBody>
                  </InspectorControls>
                ) : (
                  <p className="no-block-selected">Select a block to edit its settings</p>
                )}
              </div>

              {/* Main block editing content */}
              <div className="editor-main-content">
                <WritingFlow>
                  <ObserveTyping>
                    <BlockList />
                  </ObserveTyping>
                </WritingFlow>
              </div>

              {/* Block Toolbar */}
              {hasSelectedBlock && selectedBlock && (
                <BlockToolbar>
                  <ToolbarGroup>
                    <ToolbarButton
                      icon="trash"
                      label="Delete Block"
                      onClick={() => {
                        dispatch('core/block-editor').removeBlock(selectedBlock.clientId);
                      }}
                    />
                  </ToolbarGroup>
                </BlockToolbar>
              )}
            </div>
          </BlockEditorProvider>
        </DropZoneProvider>
      </SlotFillProvider>
    </div>
  );
};

export default GutenbergEditor;
