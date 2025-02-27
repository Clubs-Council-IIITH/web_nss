import Image from "next/image";

export default function Community() {
  const events = [
    {
      title: "Blood Donation Camp",
      description:
        "A community-driven initiative to encourage blood donation and save lives.",
      images: ["/blood-donation-1.jpg", "/blood-donation-2.jpg"],
      documents: [
        {
          name: "Acknowledgement from Osmania Hospital Team",
          link: "",
        },
        {
          name: "Donor List",
          link: "",
        },
      ],
    },
  ];

  return (
    <div>
      <h1>IIITH NSS Community</h1>

      {/* Render all events */}
      {events.map((event, index) => (
        <div
          key={index}
          style={{
            margin: "20px 0",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2>{event.title}</h2>
          <p>{event.description}</p>

          {/* Display images */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {event.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                style={{
                  position: "relative",
                  width: "150px",
                  height: "100px",
                }}
              >
                <Image
                  src={image}
                  alt={`${event.title} image ${imgIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>

          {/* Display document links */}
          <div style={{ marginTop: "10px" }}>
            <strong>Related Documents:</strong>
            <ul>
              {event.documents.map((doc, docIndex) => (
                <li key={docIndex}>
                  <a href={doc.link} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
