import React from "react";
import Image from "next/image";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { type GetTaxonApiResponse } from "~/app/museu/herbario/types/taxonomy.types";
import { decimalToDMS } from "~/utils/lat-long";

const getFamilyFromTaxons = (taxons: GetTaxonApiResponse[]) => {
  const family = taxons.find(
    (taxon) => taxon?.hierarchy?.name?.toLowerCase() === "família",
  );

  if (family) {
    return family.name;
  }

  return null;
};

type PdfExportProps = {
  specie: GetSpecieApiResponse;
  qrCodeUrl: string;
  linkToEspecie: string;
};
export const PdfExport = React.forwardRef<
  HTMLDivElement,
  { data: PdfExportProps }
>(({ data: { specie, qrCodeUrl, linkToEspecie } }, ref) => {
  return (
    <div
      ref={ref}
      className="min-h-[105mm] w-[148mm] space-y-2 bg-white p-6 font-sans text-sm text-black"
    >
      <div className="space-y-2 text-center">
        <div className="relative mx-auto h-20 w-20">
          <Image
            src="/ufra-logo.png"
            alt="UFRA Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <h2 className="text-base font-semibold">
          Universidade Federal Rural da Amazônia
        </h2>
        <p className="font-medium">Herbário FC - Belém-Pará-Brasil</p>
      </div>

      <div className="flex justify-end">
        <p>
          <strong>Registro:</strong> {specie.id}
        </p>
      </div>

      <hr className="my-2 border-gray-300" />

      <p className="uppercase">
        <strong>{getFamilyFromTaxons(specie.taxons)}</strong>
      </p>
      <p className="italic">{specie.scientificName}</p>
      <p>
        <strong>Nome vulgar:</strong> {specie?.commonName ?? "-"}
      </p>
      <p>
        <strong>Determinador:</strong> {specie?.determinator?.name ?? "-"}
      </p>
      <p>
        <strong>Coordenadas:</strong>{" "}
        {decimalToDMS(specie.location.lat, true)}{" "}
        {decimalToDMS(specie.location.long, false)}
      </p>
      <p>
        <strong>Localização:</strong> {specie.location.address} -{" "}
        {specie.location.state.code}/{specie.location.city.name},
      </p>

      <p>
        <strong>Descrição:</strong> {specie.description}
      </p>

      <p>
        <strong>Data da coleta:</strong>{" "}
        {new Date(specie.collectedAt).toLocaleDateString()}
      </p>

      <div className="flex flex-col space-y-2">
        <Image
          src={qrCodeUrl}
          alt="QR Code"
          className="w-24"
          width={80}
          height={80}
        />
        <p className="break-all text-[10px]">{linkToEspecie}</p>
        <p className="text-[10px] font-medium italic">
          Gerado em: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
});

PdfExport.displayName = "PdfExport";
