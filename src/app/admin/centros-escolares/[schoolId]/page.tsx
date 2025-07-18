"use client";

import { useParams } from "next/navigation";
import SchoolDetailLayout from "@/features/schools/school/component/schoolDetailLayout";
import { BreadcrumbItem, Breadcrumbs, Progress } from "@heroui/react";
import { useSchoolDetail } from "@/features/schools/hooks/school/useSchoolDetail";
import { Map, Phone, Mail, House, MapPinHouse } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SchoolMap from "@/features/schools/school/component/schoolMap"; //call dynamic import for SchoolMap

const SchoolDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const { schoolsDetailsList } = useSchoolDetail(Number(params.schoolId));

  if (!Array.isArray(schoolsDetailsList) || schoolsDetailsList.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No se encontró información del centro escolar.
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Centro Escolar</BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>

      <div className="bg-white border-b border-gray-200 px-6 py-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">{schoolsDetailsList[0].name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-8 md:gap-x-12 bg-white p-6">

              {/* Address Item - Now spans two columns on medium screens and up */}
              <div className="flex items-start space-y-1 space-x-3 md:col-span-3" > {/* Use items-start for multi-line text alignment */}
                <House className="w-3 h-3 text-600 flex-shrink-0 mt-2" /> {/* Icon with fixed size and color */}
                <p className="text-base text-gray-600 leading-relaxed">
                  {schoolsDetailsList[0].address}
                </p>
              </div>

              {/* Email Item - Remains in the first column of the next available row */}
              <div className="flex items-center space-y-1 space-x-3">
                <Mail className="w-3 h-3 text-gray-600 flex-shrink-0 mt-2" />
                <a href="mailto:email@email.com" className="text-base text-600 hover:underline">
                  {schoolsDetailsList[0].email}
                </a>
              </div>

              {/* Phone Number Item - Now moves to the second column of the second row */}
              <div className="flex items-center space-y-1 space-x-3">
                <Phone className="w-3 h-3 text-gray-600 flex-shrink-0 mt-2" />
                <a href={schoolsDetailsList[0].phoneNumber} className="text-base text-600 hover:underline">
                  {schoolsDetailsList[0].phoneNumber}
                </a>
              </div>

              {/* Coordenates Item - Now moves to the second column of the second row */}
              <div className="flex items-center space-y-1 space-x-3">
                <MapPinHouse className="w-3 h-3 text-gray-600 flex-shrink-0 mt-2" />
                <a href={schoolsDetailsList[0].phoneNumber} className="text-base text-600 hover:underline">
                  {schoolsDetailsList[0].coordenates || "No coordinates available"}
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>

      <div className="mt-6"><SchoolDetailLayout /></div>

      {/* Ubicación Card */}
      <div className="bg-white border border-blue-100 p-6 mt-6 h-auto" style={{ width: "100%" }}>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-500 mb-4">
          <Map className="h-5 w-5" />
          <h3 className="text-2xl font-semibold">Ubicación</h3>{schoolsDetailsList.coordenates}
        </div>

        {/* <div style={{ height: "300px", width: "100%" }}>
          {schoolsDetailsList[0].coordenates && (() => {
            // Setup a coordinates 
            ///const coordsArray =  [13.701285, -89.224431];
            //const coordsArray = [13.722783, -89.215443];
            const coordsArray = schoolsDetailsList[0].coordenates.split(",").map(coord => parseFloat(coord.trim()));
            return (
              <MapContainer
                center={coordsArray}
                zoom={19}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordsArray}>
                  <MapPinHouse>Ubicación del centro escolar </MapPinHouse>
                </Marker>
              </MapContainer>
            );
          })()}
        </div> */}

        <SchoolMap coordinates={schoolsDetailsList[0].coordenates} />
      </div>

    </div >
  );
};



export default SchoolDetailPage;
