import { Button } from "@/components/ui/button"
import { Container, Title } from "@/components/shared";
import { LibraryBig } from "lucide-react";

export default function Home() {
  return <>
    <Container className="mt-5">
      <div className="flex items-center gap-3">
        <Title text="Каталог" size="lg" className="font-extrabold" /><LibraryBig size={45}/>
      </div>


    </Container>
  
  
  </>;
}
