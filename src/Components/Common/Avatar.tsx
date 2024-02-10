import Image from "next/image";
import { FC } from "react";

type Name = string | { name: string };

type Props = {
  data: any;
  placeHolder: any;
  name?: Name;
  customeClass?: string;
  customImageClass?: string;
  height: number;
  width: number;
};

const Avatar: FC<Props> = ({
  data,
  placeHolder,
  name,
  customeClass,
  customImageClass,
  height,
  width,
}) => {
  return (
    <>
      {data?.original_url ? (
        <div className={`${customeClass ? customeClass : ""}`}>
          <Image
            className={customImageClass ? customImageClass : ""}
            src={data?.original_url}
            height={height || 50}
            width={width || 50}
            alt={
              typeof name == "undefined"
                ? ""
                : typeof name == "string"
                ? name
                : name.name
            }
          />
        </div>
      ) : placeHolder ? (
        <div className={`${customeClass ? customeClass : ""}`}>
          <Image
            className={customImageClass ? customImageClass : ""}
            src={placeHolder}
            height={height || 50}
            width={width || 50}
            alt={
              typeof name == "undefined"
                ? ""
                : typeof name == "string"
                ? name
                : name.name
            }
          />
        </div>
      ) : (
        <h1>
          {typeof name == "undefined"
            ? ""
            : typeof name == "string"
            ? name?.charAt(0).toString().toUpperCase()
            : name?.name?.charAt(0).toString().toUpperCase()}
        </h1>
      )}
    </>
  );
};

export default Avatar;
