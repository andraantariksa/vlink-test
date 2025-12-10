// Utility types
export type NamedApiResource = {
  name: string;
  url: string;
};

export type VersionGameIndex = {
  game_index: number;
  version: NamedApiResource;
};

export type VersionEncounterDetail = {
  version: NamedApiResource;
  max_chance: number;
  encounter_details: {
    min_level: number;
    max_level: number;
    condition_values: NamedApiResource[];
    chance: number;
    method: NamedApiResource;
  }[];
};

// Pokemon types
export type Pokemon = {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: NamedApiResource[];
  game_indices: VersionGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_types: PokemonTypePast[];
  species: NamedApiResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
};

export type PokemonAbility = {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
};

export type PokemonType = {
  slot: number;
  type: NamedApiResource;
};

export type PokemonFormType = {
  slot: number;
  type: NamedApiResource;
};

export type PokemonTypePast = {
  generation: NamedApiResource;
  types: PokemonType[];
};

export type PokemonHeldItem = {
  item: NamedApiResource;
  version_details: PokemonHeldItemVersion[];
};

export type PokemonHeldItemVersion = {
  rarity: number;
  version: NamedApiResource;
};

export type PokemonMove = {
  move: NamedApiResource;
  version_group_details: PokemonMoveVersion[];
};

export type PokemonMoveVersion = {
  level_learned_at: number;
  move_learn_method: NamedApiResource;
  version_group: NamedApiResource;
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
};

export type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: PokemonSpriteOther;
  versions: PokemonSpriteVersion;
};

type SpriteVariant = {
  back_default: string | null;
  back_female: string | null;
  back_gray: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_gray: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

export type PokemonSpriteOther = {
  dream_world: Pick<SpriteVariant, "front_default" | "front_female">;
  "official-artwork": {
    front_default: string | null;
    front_shiny: string | null;
  };
  home: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
};

type Generation1Sprite = {
  "red-blue": Pick<
    SpriteVariant,
    "back_default" | "back_gray" | "front_default" | "front_gray"
  >;
  yellow: Pick<
    SpriteVariant,
    "back_default" | "back_gray" | "front_default" | "front_gray"
  >;
};

type Generation2Sprite = {
  crystal: Pick<
    SpriteVariant,
    "back_default" | "back_shiny" | "front_default" | "front_shiny"
  >;
  gold: Pick<
    SpriteVariant,
    "back_default" | "back_shiny" | "front_default" | "front_shiny"
  >;
  silver: Pick<
    SpriteVariant,
    "back_default" | "back_shiny" | "front_default" | "front_shiny"
  >;
};

type Generation3Sprite = {
  emerald: Pick<SpriteVariant, "front_default" | "front_shiny">;
  "firered-leafgreen": Pick<
    SpriteVariant,
    "back_default" | "back_shiny" | "front_default" | "front_shiny"
  >;
  "ruby-sapphire": Pick<
    SpriteVariant,
    "back_default" | "back_shiny" | "front_default" | "front_shiny"
  >;
};

type Generation4Sprite = {
  "diamond-pearl": Pick<
    SpriteVariant,
    | "back_default"
    | "back_female"
    | "back_shiny_female"
    | "back_shiny"
    | "front_default"
    | "front_female"
    | "front_shiny_female"
    | "front_shiny"
  >;
  "heartgold-soulsilver": Pick<
    SpriteVariant,
    | "back_default"
    | "back_female"
    | "back_shiny_female"
    | "back_shiny"
    | "front_default"
    | "front_female"
    | "front_shiny_female"
    | "front_shiny"
  >;
  platinum: Pick<
    SpriteVariant,
    | "back_default"
    | "back_female"
    | "back_shiny_female"
    | "back_shiny"
    | "front_default"
    | "front_female"
    | "front_shiny_female"
    | "front_shiny"
  >;
};

type BlackWhiteSprite = Pick<
  SpriteVariant,
  | "back_default"
  | "back_female"
  | "back_shiny_female"
  | "back_shiny"
  | "front_default"
  | "front_female"
  | "front_shiny_female"
  | "front_shiny"
>;

type Generation5Sprite = {
  "black-white": BlackWhiteSprite & { animated: BlackWhiteSprite };
};

type Generation6Sprite = {
  "omegaruby-alphasapphire": Pick<
    SpriteVariant,
    "front_default" | "front_female" | "front_shiny_female" | "front_shiny"
  >;
  "x-y": Pick<
    SpriteVariant,
    "front_default" | "front_female" | "front_shiny_female" | "front_shiny"
  >;
};

type Generation7Sprite = {
  icons: Pick<SpriteVariant, "front_default" | "front_female">;
  "ultra-sun-ultra-moon": Pick<
    SpriteVariant,
    "front_default" | "front_female" | "front_shiny_female" | "front_shiny"
  >;
};

type Generation8Sprite = {
  icons: Pick<SpriteVariant, "front_default" | "front_female">;
};

type PokemonSpriteVersion = {
  "generation-i": Generation1Sprite;
  "generation-ii": Generation2Sprite;
  "generation-iii": Generation3Sprite;
  "generation-iv": Generation4Sprite;
  "generation-v": Generation5Sprite;
  "generation-vi": Generation6Sprite;
  "generation-vii": Generation7Sprite;
  "generation-viii": Generation8Sprite;
};

export type LocationAreaEncounter = {
  location_area: NamedApiResource;
  version_details: VersionEncounterDetail[];
};
