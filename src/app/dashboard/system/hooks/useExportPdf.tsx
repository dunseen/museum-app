"use client";

import { PdfExport } from "../activities/components/pdf-export";
import { createRoot } from "react-dom/client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { type GetPostDetailsApiResponse } from "~/app/museu/herbario/types/post.types";
import { useCallback } from "react";
import { toast } from "sonner";
import { useDisclosure } from "~/hooks/use-disclosure";

export type GeneratePdfProps = {
  post: GetPostDetailsApiResponse;
};

const buildSpecieUrl = (specieName: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = `${baseUrl}/museu/herbario/especie/${encodeURI(specieName)}`;

  return url;
};
export function useGeneratePdf() {
  const pdfDisclosure = useDisclosure();

  const generatePDF = useCallback(async (data: GeneratePdfProps) => {
    try {
      const specieUrl = buildSpecieUrl(data.post.specie.scientificName);

      const qrCodeUrl = await QRCode.toDataURL(specieUrl);

      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";
      document.body.appendChild(wrapper);

      const container = document.createElement("div");
      wrapper.appendChild(container);

      const root = createRoot(container);
      root.render(
        <PdfExport data={{ ...data, qrCodeUrl, linkToEspecie: specieUrl }} />,
      );

      await new Promise((res) => setTimeout(res, 200));

      const canvas = await html2canvas(container);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        compress: true,
        unit: "mm",
        format: [148, 105],
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `ficha-${data.post.specie.scientificName}-${new Intl.DateTimeFormat(
          "pt-BR",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          },
        ).format(new Date())}.pdf`,
      );

      document.body.removeChild(wrapper);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar PDF");
    }
  }, []);

  return {
    generatePDF,
    pdfDisclosure,
  };
}
