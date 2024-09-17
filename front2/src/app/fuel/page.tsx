import React from 'react';

export default function Fuel() {
  const symbols = [
    { img: "/path/to/1.png", name: "Fuel", description: "Indicates fuel level." },
    { img: "/path/to/2.png", name: "Battery", description: "Battery charge status." },
    { img: "/path/to/3.png", name: "Oil", description: "Oil pressure warning." },
    { img: "/path/to/4.png", name: "Engine", description: "Engine malfunction warning." },
    { img: "/path/to/5.png", name: "Temperature", description: "Engine temperature high." },
    { img: "/path/to/6.png", name: "Brake", description: "Brake system warning." },
    { img: "/path/to/7.png", name: "Airbag", description: "Airbag system issue." },
    { img: "/path/to/8.png", name: "Seatbelt", description: "Seatbelt not fastened." },
    { img: "/path/to/9.png", name: "Door", description: "Door is open." },
    { img: "/path/to/10.png", name: "Tire Pressure", description: "Low tire pressure." },
    { img: "/path/to/11.png", name: "Check Engine", description: "Check engine light on." },
    { img: "/path/to/12.png", name: "ABS", description: "Anti-lock brake system issue." },
    { img: "/path/to/13.png", name: "Traction", description: "Traction control system activated." },
    { img: "/path/to/14.png", name: "Headlight", description: "Headlight indicator." },
    { img: "/path/to/15.png", name: "Washer Fluid", description: "Low washer fluid." },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-8">
      <h1 className="text-2xl font-bold mb-4">Fuel Car Dashboard Icons</h1>
      <p className="mb-6">Below is a table with car dashboard icons, their names, and descriptions:</p>
      
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
