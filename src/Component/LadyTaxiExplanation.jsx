import React from "react";
import { Typography } from "@material-tailwind/react";
import taxiLady from "../Images/ladyTaxi.jpg";

export function LadyTaxiExplanation() {
  return (
    <div className="lady-taxi-explanation w-full p-6 sm:p-8 md:p-12 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
        {/* Text Section */}
        <div className="md:w-1/2 flex items-center">
          <div>
            <Typography
              variant="h4"
              className="mb-4 font-bold text-pink-500 border-b-2 border-pink-500 pb-1 text-center"
            >
              Was ist LadyTaxi?
            </Typography>
            <Typography variant="paragraph" className="text-gray-700 mb-4 text-center">
              LadyTaxi ist eine spezielle Option in unserer Anwendung, die entwickelt wurde, um die Sicherheit und den Komfort für Frauen – sowohl als Fahrerinnen als auch als Passagierinnen – zu verbessern.
            </Typography>
            <ul className="list-disc pl-6 mb-4 text-center">
              <li>
                <Typography variant="paragraph" className="text-gray-700">
                  Wenn Sie eine weibliche Taxifahrerin sind, können Sie die LadyTaxi-Option wählen, um nur Fahrten mit weiblichen Passagieren anzunehmen. Dies ermöglicht es Ihnen, Kunden des weiblichen Geschlechts auszuwählen und potenziell unangenehme Situationen zu vermeiden.
                </Typography>
              </li>
              <li>
                <Typography variant="paragraph" className="text-gray-700">
                  Als Passagier können Sie in der Anwendung zur Buchung von Fahrten die LadyTaxi-Option aktivieren. Dann stehen Ihnen nur weibliche Fahrerinnen zur Verfügung, was Ihre Sicherheit und Ihren Komfort erhöht.
                </Typography>
              </li>
            </ul>
            <Typography variant="paragraph" className="text-gray-700 text-center">
              Diese Funktion wurde entwickelt, um häufige unangenehme Situationen zu begegnen, die sich für Frauen als Fahrerinnen und Passagierinnen ergeben, mit dem Ziel, eine sicherere Umgebung für alle zu schaffen.
            </Typography>
          </div>
        </div>
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={taxiLady}
            alt="Weibliche Taxifahrerin"
            className="w-full h-64 sm:h-80 md:h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}