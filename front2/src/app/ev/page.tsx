"use client";

import React, { useState } from 'react';

// Import images
const imgPaths = [
  '/ev/1.png',
  '/ev/2.png',
  '/ev/3.png',
  '/ev/4.png',
  '/ev/5.png',
  '/ev/6.png',
  '/ev/7.png',
  '/ev/8.png',
  '/ev/9.png',
  '/ev/10.png',
  '/ev/11.png',
  '/ev/12.png',
  '/ev/13.png',
  '/ev/14.png',
  '/ev/15.png',
];

export default function Fuel() {
  // State to control table visibility
  const [showTable, setShowTable] = useState(true);

  const symbols = [
    { 
      img: imgPaths[0], 
      name: "Electric Motor Warning Light", 
      description: "Indicates a problem with the electric motor or powertrain.", 
      solution: "Have the electric motor or powertrain inspected."
    },
    { 
      img: imgPaths[1], 
      name: "Battery Charge Warning", 
      description: "Indicates an issue with the battery charge level or system.", 
      solution: "Check the battery and charging system."
    },
    { 
      img: imgPaths[2], 
      name: "Plug-in Indicator", 
      description: "Indicates that the vehicle is plugged in for charging.", 
      solution: "No action needed if charging; unplug if charging is complete."
    },
    { 
      img: imgPaths[3], 
      name: "Charging Status Indicator", 
      description: "Displays the current charging status of the vehicle.", 
      solution: "Monitor the charging process."
    },
    { 
      img: imgPaths[4], 
      name: "Power Limitation Warning", 
      description: "Indicates that the power output is being limited.", 
      solution: "Drive cautiously and have the system checked if needed."
    },
    { 
      img: imgPaths[5], 
      name: "Battery Temperature Warning", 
      description: "Warns of a high battery temperature.", 
      solution: "Allow the battery to cool down."
    },
    { 
      img: imgPaths[6], 
      name: "Charging Cable Connected", 
      description: "Shows that the charging cable is connected.", 
      solution: "Unplug the cable before driving."
    },
    { 
      img: imgPaths[7], 
      name: "Regenerative Braking Indicator", 
      description: "Indicates the operation of the regenerative braking system.", 
      solution: "Monitor the system and have it checked if there are issues."
    },
    { 
      img: imgPaths[8], 
      name: "High Voltage System Warning", 
      description: "Warns of a problem with the high voltage system.", 
      solution: "Have the high voltage system inspected by a professional."
    },
    { 
      img: imgPaths[9], 
      name: "Eco Mode Indicator", 
      description: "Indicates that the vehicle is in eco mode.", 
      solution: "No action needed; drive efficiently."
    },
    { 
      img: imgPaths[10], 
      name: "Ready Indicator", 
      description: "Shows that the vehicle is ready to drive.", 
      solution: "No action needed; the vehicle is operational."
    },
    { 
      img: imgPaths[11], 
      name: "Electronic Power Steering (EPS) Warning Light", 
      description: "The EPS (Electronic Power Steering) assists driver’s steering effort.", 
      solution: "If the EPS warning light stays on, have your vehicle inspected by an authorized car dealer."
    },
    { 
      img: imgPaths[12], 
      name: "Low Tire Pressure Warning Light", 
      description: "Indicates low tire pressure.", 
      solution: "Check the tire pressure and inflate the tire if necessary."
    },
    { 
      img: imgPaths[13], 
      name: "Electronic Stability Control (ESC) Indicator Light", 
      description: "Assists driver’s steering by preventing skidding on the slippery or curved road.", 
      solution: "If the ESC indicator stays on, have your vehicle inspected by an authorized car dealer."
    },
    { 
      img: imgPaths[14], 
      name: "Immobilizer Indicator Light", 
      description: "Prevents vehicle theft by allowing the registered keys to start the vehicle.", 
      solution: "If the immobilizer indicator light flashes, have your vehicle inspected by an authorized car dealer."
    },
];


  const handleClose = () => {
    // Close the table and navigate to the homepage
    setShowTable(false);
    window.location.href = '/'; // Redirect to the front page
  };

  return (
    <div className="ml-20 min-h-screen bg-black flex flex-col p-8">
      {showTable ? (
        <div className="relative">
          {/* Close button */}
          <button
            className="absolute top-0 right-0 m-2 text-3xl font-bold text-red-600"
            onClick={handleClose}
          >
            &times;
          </button>

          {/* Heading and Table */}
          <h1 className="text-2xl font-bold mb-4">EV Car Dashboard Icons</h1>
          <p className="mb-6">Below is a table with car dashboard icons, their names, descriptions, and possible solutions:</p>

          <table className="table-auto border-collapse w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Possible Solution</th>
              </tr>
            </thead>
            <tbody>
              {symbols.map((symbol, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <img
                      src={symbol.img}
                      alt={symbol.name}
                      className="w-16 h-16 object-contain"
                    />
                  </td>
                  <td className="border px-4 py-2 font-bold">{symbol.name}</td>
                  <td className="border px-4 py-2">{symbol.description}</td>
                  <td className="border px-4 py-2">{symbol.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
