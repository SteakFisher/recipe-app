import {Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {Recipe} from "@/types/Recipe";
import Image from "next/image";


export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
<Card className="w-full mx-4 ">
    <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
    </CardHeader>
    <CardContent >
        <CardDescription >
            {recipe.description}
        </CardDescription>
    </CardContent>
    <CardFooter>
        <div className={"flex justify-center items-center relative"}>
            <Image alt={"Food"} src={"/food.jpg"} width={1000} height={1000}/>
        </div>
    </CardFooter>
</Card>
  );
}