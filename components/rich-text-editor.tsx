/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  EditorState,
  RichUtils,
  convertFromHTML,
  DraftBlockType,
  ContentState,
  DraftInlineStyle,
} from "draft-js";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

// Importación dinámica de Draft.js para evitar errores de hidratación
const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
});

// Importación dinámica de la hoja de estilos
const DraftJsStyles = dynamic(() => import("./draft-js-styles"), {
  ssr: false,
});

type HtmlEditorProps = {
  initialHtml?: string;
  onSave: (html: string) => void;
};

type CustomBlockType =
  | DraftBlockType
  | "header-one"
  | "header-two"
  | "text-align-left"
  | "text-align-center"
  | "text-align-right"
  | "text-align-justify";
type CustomStyleType =
  | DraftInlineStyle
  | "FONT_SIZE_15"
  | "TIMES_NEW_ROMAN"
  | "BOLD"
  | "ITALIC";

export const RichTextEditor: React.FC<HtmlEditorProps> = ({
  initialHtml,
  onSave,
}) => {
  // Estado para controlar si estamos en el cliente
  const [isMounted, setIsMounted] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  // Controlar la inicialización del componente
  useEffect(() => {
    setIsMounted(true);

    if (initialHtml) {
      const cleanHtml = DOMPurify.sanitize(initialHtml);
      const blocksFromHTML = convertFromHTML(cleanHtml);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialHtml]);

  // Solo renderizar el editor en el cliente
  if (!isMounted) {
    return <div className="h-[300px] border border-gray-300 rounded-md"></div>;
  }

  // Manejo de formatos
  const toggleInlineStyle = (style: CustomStyleType) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style as any));
  };

  const toggleBlockType = (blockType: CustomBlockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Función para manejar cambios de alineación de texto
  const toggleTextAlignment = (
    alignment: "left" | "center" | "right" | "justify"
  ) => {
    const blockType = `text-align-${alignment}` as CustomBlockType;

    // Obtener el tipo de bloque actual
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const currentType = currentBlock.getType();

    // Si ya tenemos la misma alineación, volvemos a "unstyled" (normal)
    if (currentType === blockType) {
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    } else {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }
  };

  // Convertir a HTML
  const handleSave = () => {
    const currentContent = editorState.getCurrentContent();
    const html = convertToHTML<CustomStyleType, CustomBlockType>({
      styleToHTML: (style) => {
        if (style === "BOLD") return <strong />;
        if (style === "ITALIC") return <em />;
        if (style === "FONT_SIZE_15")
          return <span style={{ fontSize: "15px" }} />;
        if (style === "TIMES_NEW_ROMAN")
          return <span style={{ fontFamily: "Times New Roman, serif" }} />;
        return null;
      },
      blockToHTML: (block) => {
        if (block.type === "header-one")
          return (
            <h1
              style={{
                margin: "0cm",
                fontSize: "16px",
                fontFamily: "Times New Roman, serif",
                fontWeight: "normal",
              }}
            />
          );

        if (block.type === "header-two")
          return (
            <h2
              style={{
                margin: "0cm",
                textAlign: "center",
                fontSize: "13px",
                fontFamily: "Times New Roman, serif",
              }}
            />
          );

        if (block.type === "unordered-list-item")
          return {
            element: <li />,
            nest: <ul style={{ listStyleType: "circle" }} />,
          };

        if (block.type === "text-align-left")
          return <div style={{ textAlign: "left" }} />;

        if (block.type === "text-align-center")
          return <div style={{ textAlign: "center" }} />;

        if (block.type === "text-align-right")
          return <div style={{ textAlign: "right" }} />;

        if (block.type === "text-align-justify")
          return <div style={{ textAlign: "justify" }} />;

        return null;
      },
    })(currentContent);

    onSave(html);
  };

  // Verificar estilos activos
  const currentInlineStyle = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <>
      <DraftJsStyles />
      <div
        className="editor-container"
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        {/* Barra de herramientas */}
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          {/* Botones existentes */}
          <button
            type="button"
            onClick={() => toggleInlineStyle("BOLD")}
            style={{
              fontWeight: currentInlineStyle.has("BOLD") ? "bold" : "normal",
            }}
          >
            Negrita
          </button>

          <button
            type="button"
            onClick={() => toggleInlineStyle("ITALIC")}
            style={{
              fontStyle: currentInlineStyle.has("ITALIC") ? "italic" : "normal",
            }}
          >
            Itálica
          </button>

          <button
            type="button"
            onClick={() => toggleBlockType("header-one")}
            style={{
              fontWeight: currentBlockType === "header-one" ? "bold" : "normal",
            }}
          >
            Título 1
          </button>

          <button
            type="button"
            onClick={() => toggleBlockType("header-two")}
            style={{
              fontWeight: currentBlockType === "header-two" ? "bold" : "normal",
            }}
          >
            Título 2
          </button>

          <button
            type="button"
            onClick={() => toggleBlockType("unordered-list-item")}
            style={{
              fontWeight:
                currentBlockType === "unordered-list-item" ? "bold" : "normal",
            }}
          >
            Lista
          </button>

          <button
            type="button"
            onClick={() => toggleBlockType("ordered-list-item")}
            style={{
              fontWeight:
                currentBlockType === "ordered-list-item" ? "bold" : "normal",
            }}
          >
            Lista Numerada
          </button>

          {/* Separador visual */}
          <span
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              borderLeft: "1px solid #ddd",
            }}
          ></span>

          {/* Nuevos botones de alineación */}
          <button
            type="button"
            onClick={() => toggleTextAlignment("left")}
            style={{
              fontWeight:
                currentBlockType === "text-align-left" ? "bold" : "normal",
            }}
            title="Alinear a la izquierda"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => toggleTextAlignment("center")}
            style={{
              fontWeight:
                currentBlockType === "text-align-center" ? "bold" : "normal",
            }}
            title="Centrar"
          >
            ↔
          </button>

          <button
            type="button"
            onClick={() => toggleTextAlignment("right")}
            style={{
              fontWeight:
                currentBlockType === "text-align-right" ? "bold" : "normal",
            }}
            title="Alinear a la derecha"
          >
            →
          </button>

          <button
            type="button"
            onClick={() => toggleTextAlignment("justify")}
            style={{
              fontWeight:
                currentBlockType === "text-align-justify" ? "bold" : "normal",
            }}
            title="Justificar"
          >
            ⇔
          </button>
        </div>

        {/* Editor */}
        <div
          style={{
            minHeight: "200px",
            overflowY: "auto",
            borderTop: "1px solid #eee",
            paddingTop: "10px",
          }}
        >
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>

        <button
          onClick={handleSave}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Guardar
        </button>
      </div>
    </>
  );
};
