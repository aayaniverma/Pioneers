"use client";

import React, { useState } from 'react';

// Image paths (from the public folder, no need to import)
const imgPaths = [
  '/fuel/1.png',
  '/fuel/2.png',
  '/fuel/3.png',
  '/fuel/4.png',
  '/fuel/5.png',
  '/fuel/6.png',
  '/fuel/7.png',
  '/fuel/8.png',
  '/fuel/9.png',
  '/fuel/10.png',
  '/fuel/11.png',
  '/fuel/12.png',
  '/fuel/13.png',
  '/fuel/14.png',
  '/fuel/15.png',
];

export default function Fuel() {
  // State to control table visibility
  const [showTable, setShowTable] = useState(true);

  const symbols = [
    { 
      img: imgPaths[0], 
      name: "Engine Warning Light", 
      description: "Indicates a problem with the engine or emissions system.", 
      solution: "Check the engine and take the car to a mechanic for a diagnostic test."
    },
    { 
      img: imgPaths[1], 
      name: "Battery Alert", 
      description: "Indicates a problem with the car's charging system.", 
      solution: "Check the battery and alternator; replace if necessary."
    },
    { 
      img: imgPaths[2], 
      name: "Oil Pressure Warning", 
      description: "Indicates low oil pressure or low oil level.", 
      solution: "Check oil levels and refill if necessary; inspect for leaks."
    },
    { 
      img: imgPaths[3], 
      name: "Brake System Alert", 
      description: "Indicates an issue with the brake system.", 
      solution: "Check brake fluid levels and brake pads; consult a mechanic."
    },
    { 
      img: imgPaths[4], 
      name: "ABS Warning Light", 
      description: "Indicates a problem with the anti-lock braking system.", 
      solution: "Have the ABS system inspected by a professional."
    },
    { 
      img: imgPaths[5], 
      name: "Tire Pressure Warning", 
      description: "Indicates low tire pressure.", 
      solution: "Check tire pressure and inflate to the recommended level."
    },
    { 
      img: imgPaths[6], 
      name: "Airbag Warning Light", 
      description: "Indicates an issue with the airbag system.", 
      solution: "Have the airbag system checked by a professional."
    },
    { 
      img: imgPaths[7], 
      name: "Temperature Warning Light", 
      description: "Indicates the engine temperature is too high.", 
      solution: "Check coolant levels and radiator; allow the engine to cool."
    },
    { 
      img: imgPaths[8], 
      name: "Check Engine Light", 
      description: "Indicates the engine needs to be checked.", 
      solution: "Use a diagnostic tool to read the error code; consult a mechanic."
    },
    { 
      img: imgPaths[9], 
      name: "Fuel Level Warning", 
      description: "Indicates low fuel level.", 
      solution: "Refill the fuel tank as soon as possible."
    },
    { 
      img: imgPaths[10], 
      name: "Door Ajar", 
      description: "Indicates that one or more doors are open.", 
      solution: "Check all doors and close them securely."
    },
    { 
      img: imgPaths[11], 
      name: "Seat Belt Reminder", 
      description: "Indicates that seat belts are not fastened.", 
      solution: "Fasten seat belts."
    },
    { 
      img: imgPaths[12], 
      name: "Traction Control Light", 
      description: "Indicates the traction control system is active or has a fault.", 
      solution: "If active, drive cautiously; if faulty, have it inspected."
    },
    { 
      img: imgPaths[13], 
      name: "ESP/BAS Light", 
      description: "Indicates an issue with the electronic stability program.", 
      solution: "Have the system checked by a mechanic."
    },
    { 
      img: imgPaths[14], 
      name: "Cruise Control Indicator", 
      description: "Indicates that cruise control is active.", 
      solution: "Ensure safe driving speed and be ready to deactivate if necessary."
    },
    // Add the remaining symbols similarly
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
          <h1 className="text-2xl font-bold mb-4">Fuel Car Dashboard Icons</h1>
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
