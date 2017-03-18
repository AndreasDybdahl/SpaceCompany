var energy = 0; var energyps = 0;
var charcoalEngine = 0; var charcoalEngineMetalCost = 50; var charcoalEngineGemCost = 25; var solarPanel = 0; var solarPanelMetalCost = 30; var solarPanelGemCost = 35;
var oil = 0; var oilStorage = 50; var oilNextStorage = 100; var oilStorageCost = 50; var oilps = 0;
var pump = 0; var pumpMetalCost = 60; var pumpGemCost = 20; var pumpjack = 0; var pumpjackMetalCost = 250; var pumpjackGemCost = 80; var pumpjackOilCost = 50; var pumpjackOutput = 5;
var metal = 0; var metalStorage = 50; var metalNextStorage = 100; var metalStorageCost = 50; var metalps = 0;
var miner = 0; var minerMetalCost = 10; var minerWoodCost = 5; var heavyDrill = 0; var heavyDrillMetalCost = 160; var heavyDrillGemCost = 60; var heavyDrillOilCost = 50; var heavyDrillOutput = 8;
var gem = 0; var gemStorage = 50; var gemNextStorage = 100; var gemStorageCost = 50; var gemps = 0;
var gemMiner = 0; var gemMinerMetalCost = 15; var gemMinerGemCost = 10; var advancedDrill = 0; var advancedDrillMetalCost = 120; var advancedDrillGemCost = 200; var advancedDrillOilCost = 60; var advancedDrillOutput = 4;
var charcoal = 0; var charcoalStorage = 50; var charcoalNextStorage = 100; var charcoalStorageCost = 50; var charcoalps = 0;
var woodburner = 0; var woodburnerMetalCost = 10; var woodburnerWoodCost = 5; var furnace = 0; var furnaceMetalCost = 80; var furnaceWoodCost = 40; var furnaceOilCost = 100; var furnaceWoodInput = 3; var furnaceOutput = 3;
var wood = 0; var woodStorage = 50; var woodNextStorage = 100; var woodStorageCost = 50; var woodps = 0;
var woodcutter = 0; var woodcutterMetalCost = 10; var woodcutterWoodCost = 5; var laserCutter = 0; var laserCutterMetalCost = 50; var laserCutterGemCost = 90; var laserCutterOilCost = 40; var laserCutterOutput = 6;
var science = 0; var scienceps = 0;
var lab = 0; var labGain = 0.1; var labWoodCost = 10; var labGemCost = 15; var labMetalCost = 20;
var rocketFuel = 0; var rocketFuelps = 0;
var chemicalPlant = 0; var chemicalPlantMetalCost = 1000; var chemicalPlantGemCost = 750; var chemicalPlantOilCost = 500;
var rocket = 0; var rocketMetalCost = 1200; var rocketGemCost = 900; var rocketOilCost = 1000;

function refresh(){
	
	document.getElementById("energy").innerHTML = Math.floor(energy);
	document.getElementById("oil").innerHTML = Math.floor(oil);
	document.getElementById("metal").innerHTML = Math.floor(metal);
	document.getElementById("gem").innerHTML = Math.floor(gem);
	document.getElementById("charcoal").innerHTML = Math.floor(charcoal);
	document.getElementById("wood").innerHTML = Math.floor(wood);
	document.getElementById("science").innerHTML = Math.floor(science*10)/10;
	document.getElementById("rocketFuel").innerHTML = Math.floor(rocketFuel);
}

function refreshPerSec(){
	energyps = charcoalEngine+(solarPanel*0.5)-(pumpjack*4)-(heavyDrill*2)-(advancedDrill*2)-(furnace*3)-(laserCutter*4);
	oilps = pump + (pumpjack*pumpjackOutput);
	metalps = miner + (heavyDrill*heavyDrillOutput);
	gemps = gemMiner + (advancedDrill*advancedDrillOutput);
	charcoalps = woodburner + (furnace*furnaceOutput);
	woodps = woodcutter + (laserCutter*laserCutterOutput);
	scienceps = (lab*labGain);
	document.getElementById("energyps").innerHTML = energyps;
	document.getElementById("oilps").innerHTML = oilps - (chemicalPlant*20);
	if(oil >= oilStorage){
		document.getElementById("oilps").innerHTML = 0;
	}
	document.getElementById("metalps").innerHTML = metalps;
	if(metal >= metalStorage){
		document.getElementById("metalps").innerHTML = 0;
	}
	document.getElementById("gemps").innerHTML = gemps;
	if(gem >= gemStorage){
		document.getElementById("gemps").innerHTML = 0;
	}
	document.getElementById("charcoalps").innerHTML = charcoalps - charcoalEngine - (chemicalPlant*20);
	if(charcoal >= charcoalStorage){
		document.getElementById("woodps").innerHTML = woodps;
		document.getElementById("charcoalps").innerHTML = 0;
	}
	else{
		document.getElementById("woodps").innerHTML = woodps - (woodburner*2) - (furnace*furnaceWoodInput);
	}
}

function gainResources(){
	if(charcoal + charcoalps/10 >= charcoalEngine/10){
		energy += energyps/10;
		charcoal -= charcoalEngine/10;
	}
	else{
		energy += solarPanel * solarPanelGain;
	}
	if(oil + oilps/10 < oilStorage){
		oil += oilps/10;
	}
	else{
		oil = oilStorage;
	}
	if(metal + metalps/10 < metalStorage){
		metal += metalps/10;
	}
	else{
		metal = metalStorage;
	}
	if(gem + gemps/10 < gemStorage){
		gem += gemps/10;
	}
	else{
		gem = gemStorage;
	}
	if(charcoal + charcoalps/10 < charcoalStorage && wood + woodps/10 >= (charcoalps*2/10)){
		charcoal += charcoalps/10;
		wood -= (charcoalps*2)/10;
	}
	else{
		var difference = charcoalStorage - charcoal;
		if(wood >= difference*2/10){
			charcoal += difference/10;
			wood -= difference*2/10;
		}	
	}
	if(wood + woodps/10 < woodStorage){
		wood += woodps/10;
	}
	else{
		wood = woodStorage;
	}
	science += scienceps/10;
	science = Math.round(science*100)/100;
	if(oil >= chemicalPlant*20/10 && charcoal >= chemicalPlant*20/10){
		oil -= chemicalPlant*20/10;
		charcoal -= chemicalPlant*20/10
		rocketFuel += chemicalPlant/5/10;
	}
}

// Gain Buttons

function gainOil(){
	if(oil < oilStorage){
		oil += 1;
		refresh();
	}
}

function gainMetal(){
	if(metal < metalStorage){
		metal += 1;
		refresh();
	}
}

function gainGem(){
	if(gem < gemStorage){
		gem += 1;
		refresh();
	}
}

function gainCharcoal(){
	if(charcoal < charcoalStorage && wood >= 2){
		wood -= 2;
		charcoal += 1;
		refresh();
	}
}

function gainWood(){
	if(wood < woodStorage){
		wood += 1;
		refresh();
	}
}

// Resources Tab

function upgradeOilStorage(){
	if(oil >= oilStorageCost && metal >= oilStorageCost/2.5){
		oil -= oilStorageCost;
		metal -= oilStorageCost/2.5;
		oilStorage = oilNextStorage;
		oilNextStorage *= 2;
		oilStorageCost *= 2;
		refresh();
		document.getElementById("oilStorage").innerHTML = oilStorage;
		document.getElementById("oilNextStorage").innerHTML = oilNextStorage;
		document.getElementById("oilStorageCost").innerHTML = oilStorageCost;
		document.getElementById("oilStorageMetalCost").innerHTML = oilStorageCost/2.5;
	}
}

function upgradeMetalStorage(){
	if(metal >= metalStorageCost){
		metal -= metalStorageCost;
		metalStorage = metalNextStorage;
		metalNextStorage *= 2;
		metalStorageCost *= 2;
		refresh();
		document.getElementById("metalStorage").innerHTML = metalStorage;
		document.getElementById("metalNextStorage").innerHTML = metalNextStorage;
		document.getElementById("metalStorageCost").innerHTML = metalStorageCost;
	}
}

function upgradeGemStorage(){
	if(gem >= gemStorageCost && metal >= gemStorageCost/2.5){
		gem -= gemStorageCost;
		metal -= gemStorageCost/2.5;
		gemStorage = gemNextStorage;
		gemNextStorage *= 2;
		gemStorageCost *= 2;
		refresh();
		document.getElementById("gemStorage").innerHTML = gemStorage;
		document.getElementById("gemNextStorage").innerHTML = gemNextStorage;
		document.getElementById("gemStorageCost").innerHTML = gemStorageCost;
		document.getElementById("gemStorageMetalCost").innerHTML = gemStorageCost/2.5;
	}
}

function upgradeCharcoalStorage(){
	if(charcoal >= charcoalStorageCost && metal >= charcoalStorageCost/2.5){
		charcoal -= charcoalStorageCost;
		metal -= charcoalStorageCost/2.5;
		charcoalStorage = charcoalNextStorage;
		charcoalNextStorage *= 2;
		charcoalStorageCost *= 2;
		refresh();
		document.getElementById("charcoalStorage").innerHTML = charcoalStorage;
		document.getElementById("charcoalNextStorage").innerHTML = charcoalNextStorage;
		document.getElementById("charcoalStorageCost").innerHTML = charcoalStorageCost;
		document.getElementById("charcoalStorageMetalCost").innerHTML = charcoalStorageCost/2.5;
	}
}

function upgradeWoodStorage(){
	if(wood >= woodStorageCost && metal >= woodStorageCost/2.5){
		wood -= woodStorageCost;
		metal -= woodStorageCost/2.5;
		woodStorage = woodNextStorage;
		woodNextStorage *= 2;
		woodStorageCost *= 2;
		refresh();
		document.getElementById("woodStorage").innerHTML = woodStorage;
		document.getElementById("woodNextStorage").innerHTML = woodNextStorage;
		document.getElementById("woodStorageCost").innerHTML = woodStorageCost;
		document.getElementById("woodStorageMetalCost").innerHTML = woodStorageCost/2.5;
	}
}

function getCharcoalEngine(){
	if(metal >= charcoalEngineMetalCost && gem >= charcoalEngineGemCost){
		metal -= charcoalEngineMetalCost;
		gem -= charcoalEngineGemCost;
		charcoalEngine += 1;
		charcoalEngineMetalCost = Math.floor(60 * Math.pow(1.1,charcoalEngine + 1));
		charcoalEngineGemCost = Math.floor(20 * Math.pow(1.1,charcoalEngine + 1));
		document.getElementById("charcoalEngine").innerHTML = charcoalEngine;
		document.getElementById("charcoalEngineMetalCost").innerHTML = charcoalEngineMetalCost;
		document.getElementById("charcoalEngineGemCost").innerHTML = charcoalEngineGemCost;
		refresh();
		refreshPerSec();
	}
}

function getSolarPanel(){
	if(metal >= solarPanelMetalCost && gem >= solarPanelGemCost){
		metal -= solarPanelMetalCost;
		gem -= solarPanelGemCost;
		solarPanel += 1;
		solarPanelMetalCost = Math.floor(60 * Math.pow(1.1,solarPanel + 1));
		solarPanelGemCost = Math.floor(20 * Math.pow(1.1,solarPanel + 1));
		document.getElementById("solarPanel").innerHTML = solarPanel;
		document.getElementById("solarPanelMetalCost").innerHTML = solarPanelMetalCost;
		document.getElementById("solarPanelGemCost").innerHTML = solarPanelGemCost;
		refresh();
		refreshPerSec();
	}
}

function getPump(){
	if(metal >= pumpMetalCost && gem >= pumpGemCost){
		metal -= pumpMetalCost;
		gem -= pumpGemCost;
		pump += 1;
		pumpMetalCost = Math.floor(60 * Math.pow(1.1,pump + 1));
		pumpGemCost = Math.floor(20 * Math.pow(1.1,pump + 1));
		document.getElementById("pump").innerHTML = pump;
		document.getElementById("pumpMetalCost").innerHTML = pumpMetalCost;
		document.getElementById("pumpGemCost").innerHTML = pumpGemCost;
		refresh();
		refreshPerSec();
	}
}

function getPumpjack(){
	if(metal >= pumpjackMetalCost && gem >= pumpjackGemCost && oil >= pumpjackOilCost){
		metal -= pumpMetalCost;
		gem -= pumpjackGemCost;
		oil -= pumpjackOilCost;
		pumpjack += 1;
		pumpjackOilCost = Math.floor(50 * Math.pow(1.1,pumpjack + 1));
		pumpjackGemCost = Math.floor(85 * Math.pow(1.1,pumpjack + 1));
		pumpjackMetalCost = Math.floor(250 * Math.pow(1.1,pumpjack + 1));
		document.getElementById("pumpjack").innerHTML = pumpjack;
		document.getElementById("pumpjackOilCost").innerHTML = pumpjackOilCost;
		document.getElementById("pumpjackGemCost").innerHTML = pumpjackGemCost;
		document.getElementById("pumpjackMetalCost").innerHTML = pumpjackMetalCost;
		refresh();
		refreshPerSec();
	}
}

function getMiner(){
	if(metal >= minerMetalCost && wood >= minerWoodCost){
		metal -= minerMetalCost;
		wood -= minerWoodCost;
		miner += 1;
		minerWoodCost = Math.floor(5 * Math.pow(1.1,miner + 1));
		minerMetalCost = Math.floor(10 * Math.pow(1.1,miner + 1));
		document.getElementById("miner").innerHTML = miner;
		document.getElementById("minerMetalCost").innerHTML = minerMetalCost;
		document.getElementById("minerWoodCost").innerHTML = minerWoodCost;
		if(miner === 1){
			document.getElementById("researchTab").className = "";
			document.getElementById("dropdownMenu").className = "dropdown";
		}
		refresh();
		refreshPerSec();
	}
}

function getHeavyDrill(){
	if(metal >= heavyDrillMetalCost && gem >= heavyDrillGemCost && oil >= heavyDrillOilCost){
		metal -= heavyDrillMetalCost;
		gem -= heavyDrillGemCost;
		oil -= heavyDrillOilCost;
		heavyDrill += 1;
		heavyDrillOilCost = Math.floor(50 * Math.pow(1.1,heavyDrill + 1));
		heavyDrillGemCost = Math.floor(60 * Math.pow(1.1,heavyDrill + 1));
		heavyDrillMetalCost = Math.floor(160 * Math.pow(1.1,heavyDrill + 1));
		document.getElementById("heavyDrill").innerHTML = heavyDrill;
		document.getElementById("heavyDrillMetalCost").innerHTML = heavyDrillMetalCost;
		document.getElementById("heavyDrillGemCost").innerHTML = heavyDrillGemCost;
		document.getElementById("heavyDrillOilCost").innerHTML = heavyDrillOilCost;
		refresh();
		refreshPerSec();
	}
}

function getGemMiner(){
	if(metal >= gemMinerMetalCost && gem >= gemMinerGemCost){
		metal -= gemMinerMetalCost;
		gem -= gemMinerGemCost;
		gemMiner += 1;
		gemMinerGemCost = Math.floor(10 * Math.pow(1.1,gemMiner + 1));
		gemMinerMetalCost = Math.floor(15 * Math.pow(1.1,gemMiner + 1));
		document.getElementById("gemMiner").innerHTML = gemMiner;
		document.getElementById("gemMinerMetalCost").innerHTML = gemMinerMetalCost;
		document.getElementById("gemMinerGemCost").innerHTML = gemMinerGemCost;
		refresh();
		refreshPerSec();
	}
}

function getAdvancedDrill(){
	if(metal >= advancedDrillMetalCost && gem >= advancedDrillGemCost && oil >= advancedDrillOilCost){
		metal -= advancedDrillMetalCost;
		gem -= advancedDrillGemCost;
		oil -= advancedDrillOilCost;
		advancedDrill += 1;
		advancedDrillOilCost = Math.floor(60 * Math.pow(1.1,advancedDrill + 1));
		advancedDrillGemCost = Math.floor(200 * Math.pow(1.1,advancedDrill + 1));
		advancedDrillMetalCost = Math.floor(120 * Math.pow(1.1,advancedDrill + 1));
		document.getElementById("advancedDrill").innerHTML = advancedDrill;
		document.getElementById("advancedDrillMetalCost").innerHTML = advancedDrillMetalCost;
		document.getElementById("advancedDrillGemCost").innerHTML = advancedDrillGemCost;
		document.getElementById("advancedDrillOilCost").innerHTML = advancedDrillOilCost;
		refresh();
		refreshPerSec();
	}
}

function getWoodburner(){
	if(metal >= woodburnerMetalCost && wood >= woodburnerWoodCost){
		metal -= woodburnerMetalCost;
		wood -= woodburnerWoodCost;
		woodburner += 1;
		woodburnerWoodCost = Math.floor(5 * Math.pow(1.1,woodburner + 1));
		woodburnerMetalCost = Math.floor(10 * Math.pow(1.1,woodburner + 1));
		document.getElementById("woodburner").innerHTML = woodburner;
		document.getElementById("woodburnerMetalCost").innerHTML = woodburnerMetalCost;
		document.getElementById("woodburnerWoodCost").innerHTML = woodburnerWoodCost;
		refresh();
		refreshPerSec();
	}
}

function getFurnace(){
	if(metal >= furnaceMetalCost && wood >= furnaceWoodCost && oil >= furnaceOilCost){
		metal -= furnaceMetalCost;
		wood -= furnaceWoodCost;
		oil -= furnaceOilCost;
		furnace += 1;
		furnaceWoodCost = Math.floor(40 * Math.pow(1.1,furnace + 1));
		furnaceOilCost = Math.floor(100 * Math.pow(1.1,furnace + 1));
		furnaceMetalCost = Math.floor(80 * Math.pow(1.1,furnace + 1));
		document.getElementById("furnace").innerHTML = furnace;
		document.getElementById("furnaceMetalCost").innerHTML = furnaceMetalCost;
		document.getElementById("furnaceWoodCost").innerHTML = furnaceWoodCost;
		document.getElementById("furnaceOilCost").innerHTML = furnaceOilCost;
		refresh();
		refreshPerSec();
	}
}

function getWoodcutter(){
	if(metal >= woodcutterMetalCost && wood >= woodcutterWoodCost){
		metal -= woodcutterMetalCost;
		wood -= woodcutterWoodCost;
		woodcutter += 1;
		woodcutterWoodCost = Math.floor(5 * Math.pow(1.1,woodcutter + 1));
		woodcutterMetalCost = Math.floor(10 * Math.pow(1.1,woodcutter + 1));
		document.getElementById("woodcutter").innerHTML = woodcutter;
		document.getElementById("woodcutterMetalCost").innerHTML = woodcutterMetalCost;
		document.getElementById("woodcutterWoodCost").innerHTML = woodcutterWoodCost;
		refresh();
		refreshPerSec();
	}
}

function getLaserCutter(){
	if(metal >= laserCutterMetalCost && gem >= laserCutterGemCost && oil >= laserCutterOilCost){
		metal -= laserCutterMetalCost;
		gem -= laserCutterGemCost;
		oil -= laserCutterOilCost;
		laserCutter += 1;
		laserCutterOilCost = Math.floor(40 * Math.pow(1.1,laserCutter + 1));
		laserCutterGemCost = Math.floor(90 * Math.pow(1.1,laserCutter + 1));
		laserCutterMetalCost = Math.floor(50 * Math.pow(1.1,laserCutter + 1));
		document.getElementById("laserCutter").innerHTML = laserCutter;
		document.getElementById("laserCutterMetalCost").innerHTML = laserCutterMetalCost;
		document.getElementById("laserCutterGemCost").innerHTML = laserCutterGemCost;
		document.getElementById("laserCutterOilCost").innerHTML = laserCutterOilCost;
		refresh();
		refreshPerSec();
	}
}

// Research Tab

function buildLab(){
	if(wood >= labWoodCost && gem >= labGemCost && metal >= labMetalCost){
		wood -= labWoodCost;
		gem -= labGemCost;
		metal -= labMetalCost;
		lab += 1;
		labWoodCost = Math.floor(10 * Math.pow(1.1,lab + 1));
		labGemCost = Math.floor(15 * Math.pow(1.1,lab + 1));
		labMetalCost = Math.floor(20 * Math.pow(1.1,lab + 1));
		document.getElementById("lab").innerHTML = lab;
		document.getElementById("labWoodCost").innerHTML = labWoodCost;
		document.getElementById("labGemCost").innerHTML = labGemCost;
		document.getElementById("labMetalCost").innerHTML = labMetalCost;
		refresh();
		refreshPerSec();
	}
}


function unlockStorage(){
	if(science >= 5){
		science -= 5;
		document.getElementById("unlockStorage").className = "hidden";
		document.getElementById("oilStorageUpgrade").className = "";
		document.getElementById("metalStorageUpgrade").className = "";
		document.getElementById("gemStorageUpgrade").className = "";
		document.getElementById("charcoalStorageUpgrade").className = "";
		document.getElementById("woodStorageUpgrade").className = "";
		document.getElementById("unlockOil").className = "";
	}
}

function unlockBasicEnergy(){
	if(science >= 20){
		science -= 20;
		document.getElementById("charcoalNav").className = "";
		document.getElementById("energyNav").className = "";
		document.getElementById("metalNav0").style.border = "";
		document.getElementById("metalNav1").style.border = "";
		document.getElementById("metalNav2").style.border = "";
		document.getElementById("metalNav3").style.border = "";
		document.getElementById("oilNav0").style.border = "";
		document.getElementById("oilNav1").style.border = "";
		document.getElementById("oilNav2").style.border = "";
		document.getElementById("oilNav3").style.border = "";
		document.getElementById("unlockBasicEnergy").className = "hidden";
		document.getElementById("unlockSolar").className = "";
		document.getElementById("unlockMachines").className = "";
	}
}

function unlockOil(){
	if(science >= 30){
		science -= 30;
		document.getElementById("unlockOil").className = "hidden";
		document.getElementById("oilNav").className = "";
		document.getElementById("metalNav0").style.border = "";
		document.getElementById("metalNav1").style.border = "";
		document.getElementById("metalNav2").style.border = "";
		document.getElementById("metalNav3").style.border = "";
		refresh();
	}
}

function unlockSolar(){
	if(science >= 50){
		science -= 50;
		document.getElementById("unlockSolar").className = "hidden";
		document.getElementById("solarPower").className = "";
	}
}

function unlockMachines(){
	if(science >= 50){
		science -= 50;
		document.getElementById("unlockMachines").className = "hidden";
		document.getElementById("upgradeResourceTech").className = "";
		document.getElementById("oilMachine1").className = "";
		document.getElementById("metalMachine1").className = "";
		document.getElementById("gemMachine1").className = "";
		document.getElementById("charcoalMachine1").className = "";
		document.getElementById("woodMachine1").className = "";	
		document.getElementById("unlockSpace").className = "";
	}
}

function upgradeResourceTech(){
	if(science >= 200){
		science -= 200;
		pumpjackOutput *= 2;
		heavyDrillOutput *= 2;
		advancedDrillOutput *= 2;
		furnaceWoodInput *= 2;
		furnaceOutput *= 2;
		laserCutterOutput *= 2;
		document.getElementById("unlockResourceTech").className = "hidden";
		document.getElementById("pumpjackOutput").innerHTML = pumpjackOutput;
		document.getElementById("heavyDrillOutput").innerHTML = heavyDrillOutput;
		document.getElementById("advancedDrillOutput").innerHTML = advancedDrillOutput;
		document.getElementById("furnaceWoodInput").innerHTML = furnaceWoodInput;
		document.getElementById("furnaceOutput").innerHTML = furnaceOutput;
		document.getElementById("laserCutterOutput").innerHTML = laserCutterOutput;
	}
}

function unlockSpace(){
	if(science >= 500){
		science -= 500;
		document.getElementById("unlockSpace").className = "hidden";
		document.getElementById("spaceTab").className = "";
	}
}

// Space Tab

function getChemicalPlant(){
	if(metal >= chemicalPlantMetalCost && gem >= chemicalPlantGemCost && oil >= chemicalPlantOilCost){
		metal -= chemicalPlantMetalCost;
		gem -= chemicalPlantGemCost;
		oil -= chemicalPlantOilCost;
		chemicalPlant += 1;
		chemicalPlantOilCost = Math.floor(500 * Math.pow(1.1,chemicalPlant + 1));
		chemicalPlantGemCost = Math.floor(750 * Math.pow(1.1,chemicalPlant + 1));
		chemicalPlantMetalCost = Math.floor(1000 * Math.pow(1.1,chemicalPlant + 1));
		document.getElementById("chemicalPlant").innerHTML = chemicalPlant;
		document.getElementById("chemicalPlantMetalCost").innerHTML = chemicalPlantMetalCost;
		document.getElementById("chemicalPlantGemCost").innerHTML = chemicalPlantGemCost;
		document.getElementById("chemicalPlantOilCost").innerHTML = chemicalPlantOilCost;
		refresh();
		refreshPerSec();
	}
}

function getRocket(){
	if(metal >= rocketMetalCost && gem >= rocketGemCost && oil >= rocketOilCost){
		metal -= rocketMetalCost;
		gem -= rocketGemCost;
		oil -= rocketOilCost;
		rocket += 1;
		rocketOilCost = Math.floor(1000 * Math.pow(1.1,rocket + 1));
		rocketGemCost = Math.floor(900 * Math.pow(1.1,rocket + 1));
		rocketMetalCost = Math.floor(1200 * Math.pow(1.1,rocket + 1));
		document.getElementById("rocket").innerHTML = rocket;
		document.getElementById("rocketMetalCost").innerHTML = rocketMetalCost;
		document.getElementById("rocketGemCost").innerHTML = rocketGemCost;
		document.getElementById("rocketOilCost").innerHTML = rocketOilCost;
		refresh();
		refreshPerSec();
	}
}

function launchRocket(){
	if(rocket >= 1 && rocketFuel >= 20){
		rocketFuel -= 20;
		rocket -= 1;
		document.getElementById("moon").className = "";
		document.getElementById("venus").className = "";
		document.getElementById("mars").className = "";
		document.getElementById("asteroidBelt").className = "";
	}
}

function exploreMoon(){
	if(rocketFuel >= 20){
		rocketFuel -=20;
		document.getElementById("spaceMetal").className = "";
	}
}

//Timer
var timer = 0;

window.setInterval(function(){
	gainResources();
	refresh();
	if(timer === 10){
		timer = 0;
		refreshPerSec();
	}
	else{
		timer += 1;
	}
<<<<<<< HEAD
},100);
=======
},100);
>>>>>>> e80f4ef3a8c82dcc0be7a77dad72689f5d782552
