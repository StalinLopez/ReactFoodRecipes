import { pgTable,serial,text,jsonb,decimal,integer,timestamp } from "drizzle-orm/pg-core";

export const recipesTable = pgTable("recipes", {
    id: serial("id").primaryKey(),
    name : text ("name").notNull(),
    ingredients: jsonb("ingredients").$type<string[]>().notNull(),
    short_description: text("short_description").notNull(),
    rating: decimal("rating", {precision: 2,scale:1}),
    prep_time_minutes: integer("prep_time_minutes"),
    servings:integer("servings"),
    calorie:integer("calorie"),
    protein:integer("protein"),
    carbs:integer("carbs"),
    fats:integer("fats"),
    thumbnail:text("thumbnail"),
    instruction: jsonb("instructions").notNull(),
    creates_at: timestamp("created_at").defaultNow()
}); 

export const favouritesTable = pgTable("favourites",{
     id: serial("id").primaryKey(),
     userId: text("use_id").notNull(),
     recipeId:text("recipe_id").notNull(),
     title:text("title").notNull(),
     image:text("image"),
     cookTime:text("cookTime"),
     serving:text("servings"),
     description:text("description"),
     created_at:timestamp("created_at").defaultNow()
});