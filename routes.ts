import { Router } from "./deps.ts";
import { ReactSSR } from "./controller/mod.ts";
import { Player } from "./view/mod.ts";

const router = new Router();

function prefixJSFiles(fileName: string) {
  return `/react/js/${fileName}`;
}

// Player route
const playerJsFilePath = prefixJSFiles("player");
const playerM = ReactSSR(Player, playerJsFilePath);
router.get("/", playerM.renderHtml).get(playerJsFilePath, playerM.renderJS);

export default router;
