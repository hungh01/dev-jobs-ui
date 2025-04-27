import Image from "next/image";
import { useState } from "react";
import { Box } from "@mui/material";

export default function CompanyLogo({ src, alt }: { src: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Box display="flex" alignItems="center">
            <Image
                src={imgSrc || "/error-logo.png"}
                alt={alt}
                width={70}
                height={70}
                style={{
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    height: "auto",
                }}
                onError={() => setImgSrc("/error-logo.png")}
            />
        </Box>
    );
}
