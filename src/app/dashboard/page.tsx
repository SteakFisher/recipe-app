import {Command, CommandInput} from "@/components/ui/command";
import RecipeCard from "@/components/helpers/RecipeCard";
import {Recipe} from "@/types/Recipe";


export default function ButtonDemo() {

    let recipes: Recipe[] = [
        {
            name: "Test Recipe",
            description: "This is a test recipe",
            ingredients: [],
            directions: [],
            id: 1,
            user_id: 1,
        },
        {
            name: "Test Recipe",
            description: "This is a test recipe",
            ingredients: [],
            directions: [],
            id: 2,
            user_id: 1,
        },
        {
            name: "Test Recipe",
            description: "This is a test recipe",
            ingredients: [],
            directions: [],
            id: 3,
            user_id: 1,
        },
        {
            name: "Test Recipe",
            description: "This is a test recipe",
            ingredients: [],
            directions: [],
            id: 4,
            user_id: 1,
        },
        {
            name: "Test Recipe",
            description: "This is a test recipe",
            ingredients: [],
            directions: [],
            id: 5,
            user_id: 1,
        },
        {
            name: "Test Recipe",
            description: "This is a test recipe",
            ingredients: [],
            directions: [],
            id: 6,
            user_id: 1,
        },
    ]

    return (
        <>
            <div className={"flex justify-center items-center align-middle p-3"}>
                <Command className="rounded-lg border shadow-md w-1/3 ">
                    <CommandInput placeholder="Type a command or search..." />
                </Command>
            </div>
            
            {
                // Loop through recipes and display them in a grid (4 per row)
                recipes.map((recipe, divIndex) => {
                    if (divIndex % 4 == 0) {
                        return (
                            <div key={recipe.id} className={"flex p-4 justify-between"}>
                                {
                                    recipes.map((recipe, index) => {
                                        if (index >= divIndex && index < divIndex + 4){
                                            return (
                                                <RecipeCard key={recipe.id} recipe={recipe}/>
                                            )
                                        }
                                        else if (index >= divIndex + 4){
                                            return
                                        }
                                    })
                                }
                            </div>
                        )
                    }
                })
            }
        </>
    )
}
