"use client";

import { useParams } from "next/navigation";
import SchoolDetailLayout from "@/features/schools/school/component/schoolDetailLayout";
import { BreadcrumbItem, Breadcrumbs, Progress } from "@heroui/react";
import { useSchoolDetail } from "@/features/schools/hooks/school/useSchoolDetail";
import { Map, ShieldUser } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SchoolDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const { schoolDetail } = useSchoolDetail(Number(params.schoolId));
  console.log(schoolDetail?.PrincipalSchool?.firstName, "---");
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Centro Escolar</BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>

      <div className="bg-white border-b border-gray-200 px-6 py-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{schoolDetail?.name}</h1>
            <p className="text-gray-600">{schoolDetail?.address}</p>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>
      <div className="mt-6">   <SchoolDetailLayout /></div>
      
      {/* Ubicación Card */}
      <div className="bg-white border border-blue-100 p-6 mt-6 h-auto" style={{ width: "100%" }}>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-500 mb-4">
          <Map className="h-5 w-5" />
          <h3 className="text-2xl font-semibold">Ubicación</h3>
        </div>

        <div style={{ height: "300px", width: "100%" }}>
          {schoolDetail?.coordenates && (() => {
            // Setup a coordinates 
            const coordsArray = [13.6929, -89.2182] as [number, number];
            return (
              <MapContainer
                center={coordsArray}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordsArray}>
                  <Popup>Ubicación del centro escolar</Popup>
                </Marker>
              </MapContainer>
            );
          })()}
        </div>
      </div>
      {/* </div> */}


    </div >
  );
};

export default SchoolDetailPage;
