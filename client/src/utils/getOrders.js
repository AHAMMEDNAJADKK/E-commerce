export default function getOrders() {
  return (
    JSON.parse(localStorage.getItem("orders")) ||
    []
  );
}
