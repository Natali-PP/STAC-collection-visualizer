export function isEmpty(input) {
  if (Array.isArray(input)) {
    return input.length === 0;
  } else if (typeof input === "object") {
    return Object.keys(input).length === 0;
  } else {
    throw new Error("Input must be an array or object");
  }
}

export function getTag(type) {
  switch (type) {
    case "image/tiff; application=geotiff; profile=cloud-optimized":
      return "Cloud optimized GeoTIFF image";
      break;
    case "text/plain":
      return "Plain text";
      break;
    case "text/html":
      return "HTML";
      break;
    case "application/xml":
      return "XML";
      break;
    case "image/jpeg":
      return "JPEG image";
      break;
    case "application/json":
      return "JSON";
      break;
    default:
      return type;
      break;
  }
}

export function getTagStyles(type) {
  switch (type) {
    case "image/tiff; application=geotiff; profile=cloud-optimized":
      return "text-indigo-900 bg-indigo-100";
      break;
    case "text/plain":
      return "text-amber-800 bg-amber-100";
      break;
    case "text/html":
      return "text-lime-900 bg-lime-100";
      break;
    case "application/xml":
      return "text-teal-900 bg-teal-100";
      break;
    case "image/jpeg":
      return "text-sky-900 bg-sky-100";
      break;
    case "application/json":
      return "text-fuchsia-900 bg-fuchsia-100";
      break;
    default:
      return type;
      break;
  }
}

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const formattedDate = `${day}/${month}/${year} ${hour}:${min}:${sec}`;

  return formattedDate;
};
