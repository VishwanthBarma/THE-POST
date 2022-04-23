import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Main from "../components/Main";

export default function Home() {
  return (
    <div>
      <Main />
      <script type="text/javascript" src="https://unpkg.com/default-passive-events"></script>
    </div>
  )
}
