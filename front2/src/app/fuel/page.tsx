"use client";

import React, { useState } from 'react';

// Import images
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import img8 from './images/8.png';
import img9 from './images/9.png';
import img10 from './images/10.png';
import img11 from './images/11.png';
import img12 from './images/12.png';
import img13 from './images/13.png';
import img14 from './images/14.png';
import img15 from './images/15.png';

export default function Fuel() {
  // State to control table visibility
  const [showTable, setShowTable] = useState(true);

  const symbols = [
    { 
      img: img1, 
      name: "Engine Warning Light", 
      description: "Indicates a problem with the engine or emissions system.", 
      solution: "Check the engine and take the car to a mechanic for a diagnostic test."
    },
    { 
      img: img2, 
      name: "Battery Alert", 
      description: "Indicates a problem with the car's charging system.", 
      solution: "Check the battery and alternator; replace if necessary."
    },
    { 
      img: img3, 
      name: "Oil Pressure Warning", 
      description: "Indicates low oil pressure or low oil level.", 
      solution: "Check oil levels and refill if necessary; inspect for leaks."
    },
    { 
      img: img4, 
      name: "Brake System Alert", 
      description: "Indicates an issue with the brake system.", 
      solution: "Check brake fluid levels and brake pads; consult a mechanic."
    },
    { 
      img: img5, 
      name: "ABS Warning Light", 
      description: "Indicates a problem with the anti-lock braking system.", 
      solution: "Have the ABS system inspected by a professional."
    },
    { 
      img: img6, 
      name: "Tire Pressure Warning", 
      description: "Indicates low tire pressure.", 
      solution: "Check tire pressure and inflate to the recommended level."
    },
    { 
      img: img7, 
      name: "Airbag Warning Light", 
      description: "Indicates an issue with the airbag system.", 
      solution: "Have the airbag system checked by a professional."
    },
    { 
      img: img8, 
      name: "Temperature Warning Light", 
      description: "Indicates the engine temperature is too high.", 
      solution: "Check coolant levels and radiator; allow the engine to cool."
    },
    { 
      img: img9, 
      name: "Check Engine Light", 
      description: "Indicates the engine needs to be checked.", 
      solution: "Use a diagnostic tool to read the error code; consult a mechanic."
    },
    { 
      img: img10, 
      name: "Fuel Level Warning", 
      description: "Indicates low fuel level.", 
      solution: "Refill the fuel tank as soon as possible."
    },
    { 
      img: img11, 
      name: "Door Ajar", 
      description: "Indicates that one or more doors are open.", 
      solution: "Check all doors and close them securely."
    },
    { 
      img: img12, 
      name: "Seat Belt Reminder", 
      description: "Indicates that seat belts are not fastened.", 
      solution: "Fasten seat belts."
    },
    { 
      img: img13, 
      name: "Traction Control Light", 
      description: "Indicates the traction control system is active or has a fault.", 
      solution: "If active, drive cautiously; if faulty, have it inspected."
    },
    { 
      img: img14, 
      name: "ESP/BAS Light", 
      description: "Indicates an issue with the electronic stability program.", 
      solution: "Have the system checked by a mechanic."
    },
    { 
      img: img15, 
      name: "Cruise Control Indicator", 
      description: "Indicates that cruise control is active.", 
      solution: "Ensure safe driving speed and be ready to deactivate if necessary."
    },
  ];

  const handleClose = () => {
    // Close the table and navigate to the homepage
    setShowTable(false);
    window.location.href = '/'; // Redirect to the front page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-8">
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
