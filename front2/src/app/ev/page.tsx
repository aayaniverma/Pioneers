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
      name: "Electric Motor Warning Light", 
      description: "Indicates a problem with the electric motor or powertrain.", 
      solution: "Have the electric motor or powertrain inspected."
    },
    { 
      img: img2, 
      name: "Battery Charge Warning", 
      description: "Indicates an issue with the battery charge level or system.", 
      solution: "Check the battery and charging system."
    },
    { 
      img: img3, 
      name: "Plug-in Indicator", 
      description: "Indicates that the vehicle is plugged in for charging.", 
      solution: "No action needed if charging; unplug if charging is complete."
    },
    { 
      img: img4, 
      name: "Charging Status Indicator", 
      description: "Displays the current charging status of the vehicle.", 
      solution: "Monitor the charging process."
    },
    { 
      img: img5, 
      name: "Power Limitation Warning", 
      description: "Indicates that the power output is being limited.", 
      solution: "Drive cautiously and have the system checked if needed."
    },
    { 
      img: img6, 
      name: "Battery Temperature Warning", 
      description: "Warns of a high battery temperature.", 
      solution: "Allow the battery to cool down."
    },
    { 
      img: img7, 
      name: "Charging Cable Connected", 
      description: "Shows that the charging cable is connected.", 
      solution: "Unplug the cable before driving."
    },
    { 
      img: img8, 
      name: "Regenerative Braking Indicator", 
      description: "Indicates the operation of the regenerative braking system.", 
      solution: "Monitor the system and have it checked if there are issues."
    },
    { 
      img: img9, 
      name: "High Voltage System Warning", 
      description: "Warns of a problem with the high voltage system.", 
      solution: "Have the high voltage system inspected by a professional."
    },
    { 
      img: img10, 
      name: "Eco Mode Indicator", 
      description: "Indicates that the vehicle is in eco mode.", 
      solution: "No action needed; drive efficiently."
    },
    { 
      img: img11, 
      name: "Ready Indicator", 
      description: "Shows that the vehicle is ready to drive.", 
      solution: "No action needed; the vehicle is operational."
    },
    { 
      img: img12, 
      name: "EV System Warning Light", 
      description: "Warns of a system malfunction in the EV.", 
      solution: "Have the EV system checked by a professional."
    },
    { 
      img: img13, 
      name: "Battery Cooling System Warning", 
      description: "Indicates an issue with the battery cooling system.", 
      solution: "Check and service the battery cooling system."
    },
    { 
      img: img14, 
      name: "Range Indicator", 
      description: "Displays the remaining range of the vehicle.", 
      solution: "Plan your trip according to the range."
    },
    { 
      img: img15, 
      name: "Preconditioning Indicator", 
      description: "Indicates that the vehicle is preconditioning the cabin or battery", 
      solution: "Allow preconditioning to complete before driving."
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
