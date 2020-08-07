import { useQuery, useMutation, queryCache } from "react-query";
import { useSession } from "next-auth/client";

function getAddress() {
  return fetch("/api/address").then((res) => res.json());
}

export function useAddress() {
  const [session] = useSession();
  return useQuery("address", getAddress, { enabled: session });
}

function setAddress(address) {
  return fetch("/api/address", {
    method: "PUT",
    body: JSON.stringify({ address }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to submit ");
    return res;
  });
}

export function useSetAddress() {
  return useMutation(setAddress, {
    onSuccess() {
      queryCache.invalidateQueries("address");
    },
    onError() {
      queryCache.invalidateQueries("address");
    },
  });
}
