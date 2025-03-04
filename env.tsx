import { useMutation } from "@tanstack/react-query";

const deleteItem = async (id) => {
  await fetch(`/api/items/${id}`, { method: "DELETE" });
};

export function useDeleteItem(refetch) {
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      refetch(); // Refresh the data after deletion
    },
  });
}




export default function ItemList() {
    const { data: items, refetch } = useQuery({
      queryKey: ["items"],
      queryFn: () => fetch("/api/items").then((res) => res.json()),
    });
  
    const { mutate: deleteItem } = useDeleteItem(refetch);
  
    return (
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }