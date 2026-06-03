// ============================================================
// PROJECT MODAL DATA
// ============================================================

const projectData = {
  "gunman-drift": {
    title: "Gunman Drift",
    tags: ["C#", "Unity", "SteamWorks", "Unity UGS"],
    technical: `
      <p>The biggest technical challenge was implementing a secure live-service backend that couldn't be manipulated client-side. Unity UGS was used to store player data which includes: XP, money, unlocks, and leaderboards, here I got to learn about async fundamentals.</p>
      <p>The leaderboard system required async callback chains to pull Steam usernames and match them to UGS player IDs.</p>
      <p>Cross-platform developing and testing across PC, VR and Android presented me with many issues. For example, the camera set up had to be different in VR, and the UI had to be different for mobile yet interacted differently in VR as well, this meant I had to have multiple versions of different systems without the game losing any functionality.</p>
    `,
    screenshots: [
      { src: "./images/Gmd_main.png", caption: "Main gameplay" },
      { src: "./images/GMD_vr.png", caption: "VR gameplay" },
      { src: "./images/GMD_a.png", caption: "Mobile UI" },
    ],
    code: `===C# - UPGRADE CARD MANAGER===
using System;
using UnityEngine;

public enum rarity
{
    basic,
    rare,
    epic,
    legendary
}

public enum upgradeType
{
    fireRate,
    health,
    reloadSpeed,
    damage,
    xp,
    ammoCapacity,
    recoil
}

public class UpgradeCardManager : MonoBehaviour
{

    public static UpgradeCardManager Instance { get; private set; }
    [SerializeField] float basicChance;
    [SerializeField] float rareChance;
    [SerializeField] float epicChance;
    [SerializeField] float legendaryChance;

    [SerializeField] GameObject[] upgradeCards;
    [SerializeField] GameObject basicCard;
    [SerializeField] GameObject rareCard;
    [SerializeField] GameObject epicCard;
    [SerializeField] GameObject legendaryCard;

    [SerializeField] GameObject centerSpawn;
    [SerializeField] GameObject leftSpawn;
    [SerializeField] GameObject rightSpawn;

    [SerializeField] float[] fireRateImprovements;
    [SerializeField] float[] healthImprovements;
    [SerializeField] float[] reloadSpeedImprovements;
    [SerializeField] float[] damageImprovements;
    [SerializeField] float[] xpImprovements;
    [SerializeField] float[] ammoCapacityImprovements;
    [SerializeField] float[] recoilImprovements;

    void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
    }
    void Start()
    {
        upgradeCards = new GameObject[3];
    }

    public void spawnCards()
    {
        checkAndDeleteCards();
        createCard(0, leftSpawn.GetComponent<RectTransform>());
        createCard(1, centerSpawn.GetComponent<RectTransform>());
        createCard(2, rightSpawn.GetComponent<RectTransform>());
    }

    public void checkAndDeleteCards()
    {
        foreach (GameObject card in upgradeCards)
        {
            if (card != null)
            {
                Destroy(card);
            }
        }
    }

    public void createCard(int index, Transform trans)
    {
        rarity cardRarity = genRarity();
        switch (cardRarity)
        {
            case rarity.basic:
                upgradeCards[index] = Instantiate(basicCard, trans);
                break;

            case rarity.rare:
                upgradeCards[index] = Instantiate(rareCard, trans);
                break;

            case rarity.epic:
                upgradeCards[index] = Instantiate(epicCard, trans);
                break;

            case rarity.legendary:
                upgradeCards[index] = Instantiate(legendaryCard, trans);
                break;

            default:
                Debug.LogWarning("Unknown rarity: " + cardRarity);
                break;
        }
        upgradeCards[index].GetComponent<UpgradeCard>().cardRarity = cardRarity;
        upgradeCards[index].GetComponent<UpgradeCard>().cardUpgradeType = genUpgradeType();
        upgradeCards[index].GetComponent<UpgradeCard>().displayCorrectDescription();
        upgradeCards[index].GetComponent<UpgradeCard>().upgradePercentage = genUpgradePercentage(upgradeCards[index].GetComponent<UpgradeCard>().cardUpgradeType, cardRarity);
    }

    float genUpgradePercentage(upgradeType cardType, rarity cardRarity)
    {
        if (cardType == upgradeType.fireRate)
        { 
            return fireRateImprovements[(int)cardRarity];
        }
        else if (cardType == upgradeType.health)
        { 
            return healthImprovements[(int)cardRarity];
        }
        else if (cardType == upgradeType.reloadSpeed)
        { 
            return reloadSpeedImprovements[(int)cardRarity];
        }
        else if (cardType == upgradeType.xp)
        { 
            return xpImprovements[(int)cardRarity];
        }
        else if (cardType == upgradeType.ammoCapacity)
        { 
            return ammoCapacityImprovements[(int)cardRarity];
        }
        else
        { 
            return recoilImprovements[(int)cardRarity];
        }
    }

    public rarity genRarity()
    {
        float total = basicChance + rareChance + epicChance + legendaryChance;
        float random = UnityEngine.Random.Range(0f, total);

        if (random < basicChance)
        {
            return rarity.basic;
        }
        else if (random < basicChance + rareChance)
        {
            return rarity.rare;
        }
        else if (random < basicChance + rareChance + epicChance)
        {
            return rarity.epic;
        }
        else
        {
            return rarity.legendary;
        }
    }

    public upgradeType genUpgradeType()
    {
        int random = UnityEngine.Random.Range(0, Enum.GetValues(typeof(upgradeType)).Length);
        return (upgradeType)random;
    }
    

    `,
    lessons: `
      <p><strong>To improve the code, I would:</strong> Notice that in upgradeCard I use .GetComponent() multiple times in a row on the same object's component, I would change it to just getting the component once and storing it to make it cleaner. I would also consider how I have used if and switch case in the same class without there being a reason to change my method, realistically all should be switch or all should be if statements if there are no particular reasons not to make it that way.</p>
      <p><strong>To improve the project, I would:</strong> Drop the track racing aspects as making a racing map has proven very difficult and I would make it more of an open world exploration game. However, this might take a lot more time and maybe dedicated artists which is not possible right now. </p>
      <p><strong>What went well:</strong> I learned a lot in terms of what I can achieve, before this project I used to always think that adding multiplayer and cross-platform would be incredibly difficult as many of the games I have played often do not support such features, but with the right resources I was able to find that it was not so difficult as long as you plan and design before hand.
      So being able to implement VR, PC, and Android support while allowing the different platforms to join the same lobby was a substantial achievement to me. </p>
    `
  },
  
  // ============================================================

  "frankenstein-mod": {
    title: "Co-OPERATION: MultiTurn — Frankenstein Mod",
    tags: ["Lua", "Leadership", "Agile"],
    technical: `
      <p>The base game tasked players with curing patients, our mod replaced this with a new objective: assembling Frankenstein's monster and pulling a lever to awaken him. This required replacing core win condition logic while keeping the existing game systems intact.</p>
      <p>Modding an existing game in Lua meant working within the most challenging constraints yet, the game's API determined what was and wasn't possible. Before adding custom behaviors, it was vital to understand how the game functions, one of the ways I learned was by reading the base game's code and reverse-engineering each action that already existed. From this I was able to learn what can and cannot be changed.</p>
    `,
    screenshots: [
      { src: "./images/LuaMod.png", caption: "A level from our modpack" },
      { src: "./images/BaseGame.png", caption: "A level from the base game for reference" }
    ],
        code: `===LUA - ITEM TELEPORTATION CODE FILE===
-- Bring in the ability to subscribe to the GameManager's message bus for game phase changes
---@type Game
local game = LoadFacility('Game')['game']
---@type MapObject
local owner = owner or error('No owner')
local pos2 = {10, 10}
local gameManagerForInst = LoadFacility('Game')['game'] or error('No GameManager')
function teleportItem(itemToTeleport)
local itemToTeleportName = itemToTeleport.name
local tempTeleporter = gameManagerForInst.loader.instantiate('item_teleporter_in_anim', owner.gridPosition)
itemToTeleport.destroyObject()
local tempItem = gameManagerForInst.loader.instantiate(itemToTeleport.name, owner.gridPosition)
waitSeconds(1)
tempTeleporter.destroyObject()
tempItem.destroyObject()
gameManagerForInst.loader.instantiate('item_teleporter_in', owner.gridPosition)
local teleporterOutObject = owner.map.getFirstObjectTagged("teleporterOut")
local tempOut = gameManagerForInst.loader.instantiate('item_teleporter_out_anim', teleporterOutObject.gridPosition)
waitSeconds(1)
tempOut.destroyObject()
gameManagerForInst.loader.instantiate('item_teleporter_out', teleporterOutObject.gridPosition)
gameManagerForInst.loader.instantiate(itemToTeleportName, teleporterOutObject.gridPosition)
end
    `,
    lessons: `
      <p><strong>To improve the code, I would:</strong> Remove the "pos2" variable as it is not used anywhere in this file, and write an explanation for why "waitSeconds(1)" is needed and possibly make the duration into a variable incase the animation duration changes. </p>
      <p><strong>To improve as a leader, I now:</strong> Assign time for each member to experiment with their personal ideas, for example the technical lead in the team suggested adding conveyors while we were still working on other features. As the leader my thought process was that our design plans were already approved and adding what seemed like a very difficult feature was not necessary considering we have other projects and deadlines to meet.
      However, he went on to implement it in his own time and it turned out to be easier than expected and a great feature overall which helped us make more unique levels and added an additional layer of complexity and enjoyment to the mod which we would have not had otherwise. </p>
      <p><strong>What went well:</strong> I managed the team professionally, I always ensured that every member felt that the work load was fair across the team and I made adjustments based on everyone's personal circumstances while also keeping track of our deliverables progress and upcoming deadlines.
      Additionally, the mod was tested by their programming and design teams and was then approved as a success and we each got the top grade for that project.</p>
    `
  },

// ============================================================

  "hex-bound": {
    title: "HEX BOUND",
    tags: ["C#", "Unity", "3D", "Game Jam"],
    technical: `
      <p>The core challenge was making a game controllable with a single input which was the spacebar. My solution was a timer-driven action wheel cycling through available actions automatically, selecting an action or UI button was a matter of timing the spacebar.</p>
      <p>The grid-based dungeon logic required a clean separation between world state and visual representation, updating one without the other caused desyncs I had to debug under time pressure.</p>
      <p>I was also able to implement a custom outline shader which was new territory for me at the time.</p>
    `,
    screenshots: [
      { src: "./images/HexBound.png", caption: "HEX BOUND gameplay" }
    ],
    code: `N/A`
    ,
    lessons: `
      <p><strong>To improve the project, I would:</strong> Have spent longer testing or getting some friends to test it for me as there was a bug which after input spamming led to the character becoming less and less centered on their grid piece which ended up looking confusing. I would have also considered making the map bigger or added new levels as the game is fairly short, maybe I could have focused less on shaders and mechanics. </p>
      <p><strong>What went well:</strong> I won the game jam and my solution to the space bar only input restraint was unique to the other contestants. </p>
    `
  },

// ============================================================

  "devil-plinko": {
    title: "DEVIL PLINKO",
    tags: ["C#", "Unity", "2D", "Game Jam"],
    technical: `
      <p>Three hours was a difficult constraint. The approach was to use Unity's built-in 2D physics as much as possible and only write logic physics couldn't handle which was the upgrade system and scoring.</p>
      <p>The progression and scaling were difficult to get right, as the player upgrades, pegs were added and needed to redistribute without creating unplayable gaps or clusters.</p>
    `,
    screenshots: [
      { src: "./images/Devil Plinko.png", caption: "Devil Plinko gameplay" }
    ],
    code: `N/A`
    ,
    lessons: `
      <p><strong>To improve the project, I would:</strong> Implement a more complicated and robust algorithm for the progression scaling so that the game board and upgrades could keep growing and be more and more engaging, instead the game ends quickly as you buy the final upgrade.</p>
      <p><strong>What went well:</strong> One of my objectives was that this game needed to be satisfying due to the reliance on physics and I received a few comments like that which suggests I succeeded on that front.</p>
    `
  },

// ============================================================

  "restaurant-booking": {
    title: "Restaurant Booking App",
    tags: ["Java", "Android", "REST API"],
    technical: `
      <p>The main challenge was handling async REST API calls on Android as it introduced new bugs which I had never seen before. </p>
      <p>Form validation also needed to handle edge cases well as partial dates, invalid phone formats, and empty required fields all needed distinct error states rather than a generic failure message to adhere to the HCI requirements of the submission. </p>
    `,
    screenshots: [
      { src: "./images/androidjava.png", caption: "Restaurant booking app" }
    ],
        code: `N/A
    `,
    lessons: `
      <p><strong>To improve the project, I would:</strong> Spend more time looking at other booking apps and see what I could do differently to stand out as I feel my app was mostly generic in the end, I also did not include any art or photography related to the restaurant in my app.</p>
      <p><strong>What went well:</strong> This was my first API linked program and it worked well and my app was easy to navigate due to my careful planing prior to putting it all together. </p>
    `
  },

  // ============================================================

  "drive": {
    title: "DRIVE: THE TEN FUEL CANS",
    tags: ["C++", "OpenGL", "GLSL"],
    technical: `
      <p>Building a game with the 3D renderer from scratch meant that I had to consider many new factors than if I was just working in Unity. The transformation pipeline, lighting model, camera system, and collision detection all had to be written manually.</p>
      <p>The GLSL shader work was the hardest. Understanding how vertex and fragment shaders communicated was tricky, the bugs I experienced here took a long time to resolve. </p>
      <p>Matrix math for camera transformations: view, projection, model matrices, had to be implemented and debugged without visual tools, this required a strong understanding of the fundamentals.</p>
    `,
    screenshots: [
      { src: "./images/project-3.png", caption: "Custom OpenGL renderer" }
    ],
        code: `===GLSL - Multiple Texture Spotlight fragment shader ===
    #version 460
in vec3 Position;
in vec3 Normal;
in vec2 TexCoord;

layout (binding=0) uniform sampler2D tilesTex;
layout (binding=1) uniform sampler2D rustTex;
layout (location = 0) out vec4 FragColor;

uniform struct SpotLightInfo{
    vec3 Position;
    vec3 La;
    vec3 L;
    vec3 Direction;
    float Exponent;
    float Cutoff;
}Spot;

const int levels = 5;
const float scaleFactor = 1.0/levels;

uniform struct MaterialInfo{
    vec3 Kd;
    vec3 Ka;
    vec3 Ks;
    float Shininess;
}Material;

uniform struct FogInfo{
    float MaxDist;
    float MinDist;
    vec3 Color;
} Fog;

vec3 blinnPhong(vec3 position, vec3 n){
    vec3 diffuse=vec3(0),spec=vec3(0);
    vec4 tilesTexColor = texture(tilesTex, TexCoord);
    vec4 rustTexColor = texture(rustTex, TexCoord);
    vec3 texColor=mix(tilesTexColor.rgb, rustTexColor.rgb, rustTexColor.a);
    vec3 ambient=Spot.La * texColor;
    vec3 s = normalize(Spot.Position-position);

    float cosAng=dot(-s,normalize(Spot.Direction));
    float angle=acos(cosAng);
    float spotScale;

    if (angle>=0.0&&angle<Spot.Cutoff){
        spotScale=pow(cosAng, Spot.Exponent);
        float sDotN=max(dot(s,n),0.0);
        diffuse=texColor*floor(sDotN*levels)*scaleFactor;
        if (sDotN>0.0){
            vec3 v=normalize(-position.xyz);
            vec3 h=normalize(v+s);
            spec =Material.Ks*pow(max(dot(h,n), 0.0), Material.Shininess);
        }
    }

    return ambient+spotScale*(diffuse+spec)*Spot.L;
}

void main() {

    float dist=abs(Position.z);
    float fogFactor=(Fog.MaxDist - dist)/(Fog.MaxDist - Fog.MinDist);
    fogFactor = clamp (fogFactor, 0.0, 1.0);
    vec3 shadeColor = blinnPhong(Position, normalize(Normal));
    vec3 color = mix(Fog.Color, shadeColor, fogFactor);
    FragColor = vec4(color, 1.0f);

}
    

    `,
    lessons: `
      <p><strong>To improve the code, I would:</strong> Notice that spotScale was not initialised and that I declared 2 variables in one line which is harder to read. </p>
      <p><strong>To improve the project, I would:</strong> Separate the materials for the car, I was unwilling to take risks and spend an indefinite amount of time trying to figure out why I could not get multiple materials to display, however I was certainly able to spare some time and it is possible that I could have worked it out quickly. </p>
      <p><strong>What went well:</strong> I achieved the atmosphere that I was going for and managed to make a game without using an engine. </p>
    `
  },

// ============================================================

  "greatest-blacksmith": {
    title: "Greatest Blacksmith",
    tags: ["C#", "Unity", "Blender", "Android"],
    technical: `
      <p>The main technical challenge was figuring out the UI/UX, we simply had a lot of features we wanted to add and fitting all the information on a phone screen was quite difficult .</p>
      <p>The full 3D asset pipeline from Blender to Unity required establishing consistent export settings, UV unwrapping conventions, and material naming so assets dropped in cleanly without manual fixing each time, as I was the only artist, making sure that I balanced time and quality was crucial as I still needed to contribute through UI/UX programming.</p>
    `,
    screenshots: [
      { src: "./images/Greatest Blacksmith.png", caption: "Greatest Blacksmith gameplay" }
    ],
        code: `===C# - Camera Control===
    using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class CameraControl : MonoBehaviour
{
    public static CameraControl Instance { get; private set; }
    [Header("UI Camera Controls")]
    [SerializeField] private Button leftButton;
    [SerializeField] private Button rightButton;

    [Header("Forge Objects")]
    [SerializeField] private Transform forgeObjectsParent;

    private Transform[] forgeObjects;

    private int currentChildIndex = 0;


    void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;

        if (forgeObjectsParent != null) // make sure that parent object is assigned
        {
            forgeObjects = new Transform[forgeObjectsParent.childCount];
            for (int i = 0; i < forgeObjectsParent.childCount; i++)
            {
                forgeObjects[i] = forgeObjectsParent.GetChild(i).transform;
            }
        }
        else
            Debug.LogError("Forge objects parent is unassigned in the Inspector");

        if (leftButton != null && rightButton != null) // make sure that buttons are assigned
        {  
            //leftButton.onClick.AddListener(() => OnLookAtChild(-1));
            //rightButton.onClick.AddListener(() => OnLookAtChild(1));
        }
    }

    public void OnLookAtChild(int direction)
    {
        currentChildIndex += direction;

        if (currentChildIndex >= forgeObjects.Length)
        {
            currentChildIndex = 0;  // wraps around to the first child
        }
        else if (currentChildIndex < 0)
        {
            currentChildIndex = forgeObjects.Length - 1;  // wraps around to the last child
        }

        Transform currentObject = forgeObjects[currentChildIndex];

        Debug.Log($"Looking at child {currentChildIndex}: {currentObject.name}");
        transform.LookAt(currentObject);
    }

    public void LookAtWorkshopObject(Globals.WorkshopObject workshopObject)
    {
        int objectIndex = (int)workshopObject;

        //currentChildIndex = objectIndex;
        Transform specificObject = forgeObjects[objectIndex];

        Debug.Log($"Looking at specific object {workshopObject}: {specificObject.name}");

        int multiplication = currentChildIndex - objectIndex;

        //transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x, transform.rotation.eulerAngles.y - 60 * multiplication, transform.rotation.eulerAngles.z);
        Quaternion newRot = Quaternion.Euler(transform.rotation.eulerAngles.x, transform.rotation.eulerAngles.y - 60 * multiplication, transform.rotation.eulerAngles.z);
        //Quaternion newRot = Quaternion.EulerAngles(transform.rotation.eulerAngles.x - 60 * multiplication, transform.rotation.eulerAngles.y, transform.rotation.eulerAngles.z);
        //Quaternion newRot = Quaternion.EulerAngles(transform.rotation.eulerAngles.x, transform.rotation.eulerAngles.y, transform.rotation.eulerAngles.z - 60 * multiplication);

        //transform.rotation = newRot;

        StartCoroutine(RotateOverTime(0.5f, newRot));

        currentChildIndex = objectIndex;
    }

    IEnumerator RotateOverTime(float duration, Quaternion newRot)
    {
        WorkShopUIManager.Instance.DisableWorkshopNavigation();

        // Start time
        float timeElapsed = 0f;

        // Store the initial rotation
        Quaternion initialRotation = transform.rotation;

        // Loop until the duration has passed
        while (timeElapsed < duration)
        {
            // Calculate the fraction of the journey completed (0 to 1)
            float t = timeElapsed / duration;

            // Interpolate between the initial and target rotation using Quaternion.Lerp
            transform.rotation = Quaternion.Lerp(initialRotation, newRot, t);

            // Increase the time elapsed
            timeElapsed += Time.deltaTime;

            // Yield to wait until the next frame
            yield return null;
        }

        // Ensure the final rotation is exactly the target rotation
        transform.rotation = newRot;

        WorkShopUIManager.Instance.EnableWorkshopNavigation();

    }
}
    `,
    lessons: `
      <p><strong>To improve the code, I would:</strong> Remove all the commented code that doesn't have an explanation as to why. Print (debug.log) should be removed too as this feature is complete. </p>
      <p><strong>To improve as a team mate, I now:</strong> trust my team mates a lot more and have more time to focus on my part of the project. My teammate proved that he can program complex systems and with time I learned that I no longer had to check as often to see what he was doing. </p>
      <p><strong>What went well:</strong> We made a fairly interactive game with some really good features, we also got a top grade and have been told to consider expanding the project outside of university. </p>
    `
  },

// ============================================================
  
  "ranger-nes": {
    title: "Ranger NES",
    tags: ["GDScript", "Godot", "2D"],
    technical: `
      <p>Working in Godot after primarily using Unity required adapting to a different scene and node architecture. We all spent a week learning about Godot and what our roles were and this was enough to complete the project.</p>
      <p>The save system needed to persist high-scores across sessions reliably, handling file I/O in GDScript was new but once I understood it, it became manageable. </p>
    `,
    screenshots: [
      { src: "./images/Ranger_gp.png", caption: "Ranger NES gameplay" }
    ],
        code: `===GdScript - Game Manager===
    
    extends Node

#score
var points = 0
@onready var score = get_node("/root/Level/Player/Score")

#audio
@onready var acorn_sfx = get_node("/root/Level/Player/Collect")
@onready var level_music = $"../LevelMusic"
@onready var pause_sfx = $"../Pause"
@onready var unpause_sfx = $"../Unpause"
@onready var confirm_sfx = $"../Confirm"
@onready var victory_sfx = $"../Victory"
var playback_position #used to resume from before pausing instead of restarting music

#UI - pause menu
@onready var pause_menu = $"../Player/PausePopup"
@onready var pause_exit_button = $"../Player/PausePopup/PauseCont/PauseExitButton"

#UI - win menu
@onready var win_menu = $"../Player/WinMenu"
@onready var win_exit_button = $"../Player/WinMenu/WinCont/WinExitButton"
@onready var end_top = $"../Player/WinMenu/EndTop"

#UI - animations
@onready var menu_animations = $"../MenuAnimations"

#misc
@onready var player = $"../Player"
@onready var black_ol = $"../BlackOL" #overlay/background
@onready var timer = $"../Player/Timer"

#time formatting vars / time system
@onready var time_text = $"../Player/WinMenu/TimeText"
var minutes
var seconds
var milliseconds
var time_string
var time_elapsed := 0.0

#save system
var SaveScore  = preload ("res://scripts/SaveScore.gd")
var high_score = ""
var best_time := 1000000.0

#gameplay
var has_won = false

#adds point, edits acorn text, plays the acorn sound effect and checks if thats the winning acorn.
func add_point():
	points += 1
	score.text = "Acorns: " + str(points) + "/21"
	acorn_sfx.play()
	check_if_won()

#checks for win, if won, load and save data for high scores
func check_if_won():
	if points == 21 and !player.is_paused:
		has_won = true
		win_menu.visible = true
		player.is_paused = true
		Engine.time_scale = 0 #set game speed to 0
		win_exit_button.grab_focus()
		victory_sfx.play()
		time_text.text = "Time: " + str(time_string) 
		level_music.stop()
		
		#create saving object and set up time variables (high_score looks like 00:00:00 and best_time is in seconds e.g 102.12 which is 1 minute 42 seconds, used to check for high score)
		var save_instance = SaveScore.load_data()
		#ensure its not null, otherwise there is no data file and a new one has to be created where the current score is then saved
		if save_instance != null:
			high_score = save_instance.high_score
			best_time = save_instance.best_time
			print("Loaded high score: ", high_score)
			print("Loaded best time: ", best_time)
		else:
			save_instance = SaveScore.new()
			save_instance.high_score = str(time_string)
			save_instance.best_time = time_elapsed
			save_instance.save_data()
			print("no save data, loading current")
		
		#check if your time is worse than best time from save file
		if best_time > time_elapsed:
			print("new highscore")
			save_instance.high_score = str(time_string)
			save_instance.best_time = time_elapsed
			save_instance.save_data()
			end_top.text = "TOP: " + time_string
		elif best_time < time_elapsed:
			print("not highscore")
			end_top.text = "TOP: " + high_score
		#if there is no previous data, display empty text
		else:
			print("no data")
			end_top.text = "TOP: --:--:--"
			
		#if best is the same as the current then update the text
		if best_time == time_elapsed:
			end_top.text = "TOP: " + time_string
		
		time_text.text = "Time: " + time_string

#every frame
func _process(delta):
	#if pausing button pressed, check if they have not won
	if Input.is_action_just_pressed("start") and !has_won:
		#unpause if paused already
		if player.is_paused == true:
			unpause_game()
		else:
			pause_game()
	#if unpaused, count the timer, otherwise dont count the timer
	if !player.is_paused and !has_won:
		time_elapsed += delta
	#timer formatting for the display
	minutes = time_elapsed / 60
	seconds = fmod(time_elapsed, 60)
	milliseconds = fmod(time_elapsed, 1) * 100
	time_string = "%02d:%02d:%02d" % [minutes, seconds, milliseconds]
	time_text.text = "Time: " + time_string
	timer.text = "Time: " + time_string

func pause_game():
	pause_exit_button.grab_focus()
	pause_sfx.play()
	pause_menu.visible = true
	Engine.time_scale = 0
	playback_position = level_music.get_playback_position()
	level_music.stop()
	player.is_paused = true
	
func unpause_game():
	unpause_sfx.play()
	pause_menu.visible = false
	Engine.time_scale = 1
	level_music.play(playback_position)
	player.is_paused = false
	

func _on_button_pressed():
	if has_won == true:
		menu_animations.play("selected_2")
		win_exit_button.grab_focus()
	elif player.is_paused == true:
		menu_animations.play("selected")
		pause_exit_button.grab_focus()
	var bus_index = AudioServer.get_bus_index("SFX")
	AudioServer.set_bus_mute(bus_index, true)
	black_ol.visible = true
	Engine.time_scale = 1
	confirm_sfx.play()
	await get_tree().create_timer(1.5).timeout
	black_ol.visible = false
	AudioServer.set_bus_mute(bus_index, false)
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")

func _on_retry_button_pressed():
	print("reloading scene")
	menu_animations.play("selected_3")
	pause_menu.visible = false
	Engine.time_scale = 1
	player.is_paused = false
	call_deferred("_change_scene", "res://scenes/black.tscn")

func _change_scene(scene_path: String):
	get_tree().change_scene_to_file(scene_path)
	
func _on_ready():
	pause_menu.visible = false
	Engine.time_scale = 1
	player.is_paused = false

    `,
    lessons: `
      <p><strong>To improve the code, I would:</strong> Notice that check_if_won() is doing too much, it would be much cleaner to split it into multiple functions. </p>
      <p><strong>To improve as a team mate, I now:</strong> Have an understanding of properly scoping a game idea. Before this project, I would come up with many ideas and implement them mediocrely, this project showed how we could make a clean experience that was polished instead of rushed. </p>
      <p><strong>What went well:</strong> We completed the game jam with a polished game using an engine none of us had any experience with prior. </p>
    `
  },

// ============================================================

  "all-for-one": {
    title: "All For One",
    tags: ["C#", "Unity", "2D"],
    technical: `
      <p>This was the first game jam I was part of, my job was to work on the UI and Art as well as helping debug.</p>
      <p>We learned that sharing the entire project back and forth whenever the other person wanted to work on it through GoogleDrive was not the correct approach. </p>
    `,
    screenshots: [
      { src: "./images/AFO.png", caption: "All For One gameplay" }
    ],
        code: `N/A
    `,
    lessons: `
      <p><strong>To improve as a team mate, I now:</strong> Establish tools used by the team before the project, I now explore alternatives based on what the project requirements are, this applies to version control, art assets, communication, and progress tracking/task allocation. For me the toolset would be Git, Itch.io/Unity asset store, Discord, and Trello. </p>
      <p><strong>What went well:</strong> We successfully made our first team game for a game jam and learned a lot from it. </p>
    `
  }
};

// ============================================================
// MODAL ENGINE
// ============================================================

function openModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  const modal = document.getElementById('project-modal');

  // Reset to first tab
  modal.querySelectorAll('.modal-tab').forEach((t, i) => t.classList.toggle('active', i === 0));
  modal.querySelectorAll('.modal-panel').forEach((p, i) => p.classList.toggle('active', i === 0));

  // Fill content
  modal.querySelector('.modal-title').textContent = data.title;

  const tagsEl = modal.querySelector('.modal-tags');
  tagsEl.innerHTML = data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

  modal.querySelector('#tab-technical').innerHTML = data.technical;

  modal.querySelector('#tab-screenshots').innerHTML = data.screenshots.map(s => `
    <figure class="modal-figure">
      <img src="${s.src}" alt="${s.caption}" />
      <figcaption>${s.caption}</figcaption>
    </figure>
  `).join('');

  modal.querySelector('#tab-code').innerHTML = `<pre><code>${escapeHtml(data.code.trim())}</code></pre>`;
  modal.querySelector('#tab-lessons').innerHTML = data.lessons;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('project-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Tab switching
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
});

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
