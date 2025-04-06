# ETS2 / ATS Mobile Route Advisor [![Downloads](https://img.shields.io/github/downloads/meatlayer/ets2-mobile-route-advisor/total.svg)](https://github.com/meatlayer/ets2-mobile-route-advisor/releases) [![Current Release](https://img.shields.io/github/release/meatlayer/ets2-mobile-route-advisor.svg)](https://github.com/meatlayer/ets2-mobile-route-advisor/releases) [![Licensed under the MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/meatlayer/ets2-mobile-route-advisor/blob/master/LICENSE)

## EN:
Euro Truck Simulator 2 / American Truck Simulator's Route Advisor, for mobile devices.
This is a skin for [ETS2 Telemetry Server 4.1.2.4+](https://github.com/meatlayer/TelemetryServer4/releases/download/4.1.2.4/TelemetryServerSetup-4.1.2.4.exe)

## Features
> Notice #1: Map contains POI directly on the map images (if the Map follows the driving direction, these icons do NOT rotate).
> Notice #2: Flags have been disabled due to poor map performance when displaying them. You can enable them if needed by uncommenting the lines in the map.js

- Navigation
    - Mini-map (ETS2 & ATS)
    - Truck label is pinned in the center, the map rotates if the truck rotates in relation to the parts of the light (N, S, E, W)
    - Pinned map, the truck label is rotated on the map if the position of the truck changes in relation to the parts of the light
    - Free view/rotate/zoom
    - Auto zoom map depending on speed
    - Speed limit
    - Distance Remaining
    - Estimated time of arrival (ETA)
    - Time to destination
- Current job information
    - Current load
    - Destination city
    - Payout
    - Time remaining
    - Time until next rest
- Truck damage / load damage
- Localization support


ETS 2 inclued:
- DLC Going East
- DLC Scandinavia
- DLC Vive La France
- DLC Italia
- DLC Beyond the Baltic Sea
- DLC Road to the Black Sea
- DLC Iberia
- DLC Heart of Russia - _release date unknown TBA_
- DLC West Balkans
- DLC Greece

ATS inclued:
- DLC Nevada
- DLC Arizona
- DLC New Mexico
- DLC Oregon
- DLC Washington
- DLC Utah
- DLC Idaho
- DLC Colorado
- DLC Wyoming
- DLC Montana
- DLC Texas
- DLC Oklahoma
- DLC Kansas
- DLC Nebraska
- DLS Arkansas
- DLS Missouri


## Requirements
- Euro Truck Simulator 2 and/or American Truck Simulator v1.54
- [ETS2 Telemetry Server](https://github.com/meatlayer/TelemetryServer4/releases/download/4.1.2.4/TelemetryServerSetup-4.1.2.4.exe) 4.1.2.4+

## How to Install
1. First, download and install ETS2 Telemetry Server. After, download the latest version of the Mobile Route Advisor from the [releases page](https://github.com/meatlayer/ets2-mobile-route-advisor/releases).
2. Extract the contents of the zip to the ETS2 Telemetry Server's `\Telemetry Server\Html\skins\ets2-mobile-route-advisor` directory. You should then have a folder named `ets2-mobile-route-advisor` in the `skins` directory.

## How to Capture map in future game versions
1. Download the latest version of the ts-map from either the [official website](https://github.com/dariowouters/ts-map) for ets2 / ats version v1.54+.
2. Extract the contents of the zip in your PC disk `C:\ts-map` directory. Run `TsMap.Canvas` app.
3. Select the game folder, for example C:\Program Files (x86)\Steam\steamapps\common\Euro Truck Simulator 2 and press Continue.
4. After successfully opening the map in the app, configure the color palette in the menu. Example in the screenshot: 

![palete example](./example1-setting.png)

5. Run Main - Generate tile map, set the capture parameters according to the parameters in the screenshot (Start: 0, End: 8, 512px tile size, padding 384, checkbox "CityNames" disable)

![capture example](./example2-capture.png)

Press Generate, Select a folder, for example C:/ets2-map, and waiting, this process can take an average of 10 minutes on PCs: i7 12700kf, RTX3080ti, NVME 1TB.

6. After the operation is completed, the finished tiles will be stored in the folder C:/ets2-map/Tiles these folders 0 1 2 3 4 5 6 7 8 will need to be placed in ets2-mobile-route-advisor.

7. After completing the operation, you may need a file with the coordinates of the cities it will be in the file C:/ets2-map/Cities.json its contents will need to be adapted to the file ets2-mobile-route-advisor\maps\ets2\js\cities.js - it's quite simple, just compare their contents.

8. Minor edits may be required, but otherwise, the most difficult part is capturing the tile map. And if you have successfully completed this step, the rest should not be difficult. Enjoy :)


## RU:
Euro Truck Simulator 2 / American Truck Simulator's Route Advisor - Навигатор для мобильных устройств (работает через браузер).
Это готовый скин для сервера телеметрии - [ETS2 Telemetry Server 4.1.2.4+](https://github.com/meatlayer/TelemetryServer4/releases/download/4.1.2.4/TelemetryServerSetup-4.1.2.4.exe)

## Возможности
> Обратите внимание #1: Карта содержит POI-значки непосредственно на изображениях карты (если карта следует направлению движения, эти значки НЕ вращаются).
> Обратите внимание #2: Флаги были отключены из-за плохой производительности карты при их отображении. Вы можете включить их, если это необходимо, раскомментировав строки в map.js

- Навигация
     - Мини-карта (ETS2 и ATS)
     - Фиксация метки грузовика в центре, карта поворачивается, если грузовик поворачивается по отношению к частям света (С, Ю, З, В)
     - Фиксация карты, метка грузовика поворачивается на карте, если положение грузовика изменяется по отношению к частям света
     - Свободный просмотр / поворот / масштабирование
     - Автоматическое масштабирование карты в зависимости от скорости
     - Ограничение скорости
     - Оставшееся расстояние
     - Расчетное время прибытия (ETA)
     - Время до пункта назначения
- Текущая информация о грузе
     - Вес груза
     - Город назначения
     - Стоимость
     - Оставшееся время (ETA)
     - Время до следующего отдыха
- Повреждение грузовика / повреждение груза
- Поддержка локализации 

ETS 2 в составе карты:
- DLC Going East
- DLC Scandinavia
- DLC Vive La France
- DLC Italia
- DLC Beyond the Baltic Sea
- DLC Road to the Black Sea
- DLC Iberia
- DLC Heart of Russia - _release date unknown TBA_
- DLC West Balkans
- DLC Greece

ATS в составе карты:
- DLC Nevada
- DLC Arizona
- DLC New Mexico
- DLC Oregon
- DLC Washington
- DLC Utah
- DLC Idaho
- DLC Colorado
- DLC Wyoming
- DLC Montana
- DLC Texas
- DLC Oklahoma
- DLC Kansas
- DLC Nebraska
- DLS Arkansas
- DLS Missouri

## Требования
- Euro Truck Simulator 2 и (или) American Truck Simulator  v1.54
- [ETS2 Telemetry Server](https://github.com/meatlayer/TelemetryServer4/releases/download/4.1.2.4/TelemetryServerSetup-4.1.2.4.exe) 4.1.2.4+

## Как установить
1. Во-первых, установите сервер телеметрии [ETS2 Telemetry Server](https://github.com/meatlayer/TelemetryServer4/releases/download/4.1.2.4/TelemetryServerSetup-4.1.2.4.exe). После этого загрузите последнюю версию ETS2 / ATS Mobile Route Advisor из раздела последних релизов [releases page](https://www.github.com/meatlayer/ets2-mobile-route-advisor/releases).
2. Распакуйте содержимое zip-файла в каталог ETS2 Telemetry Server `\Telemetry Server\Html\skins\ets2-mobile-route-advisor`. У вас должна быть папка именно с именем `ets2-mobile-route-advisor` в каталоге `skins`. И вней должно быть содержимое скина. После чего, Вы можете запустить ETS2 Telemetry Server, открыть его в браузере по IP:25555 URL и найти в списке скин с именем Mobile Route Advisor.


## Support
If you require any type of support, please looking at the [contributing guidelines](https://github.com/meatlayer/ets2-mobile-route-advisor/blob/master/CONTRIBUTING.md) to see where you should post your request. **Please do not contact me directly via e-mail, as your e-mail will be ignored.**

## Languages
- be-BY.json
- cs-CZ.json
- da-DK.json
- de-DE.json
- el-GR.json
- en-US.json
- es-ES.json
- fr-CA.json
- fr-FR.json
- it-IT.json
- nl-NL.json
- pl-PL.json
- pt-BR.json
- pt-PT.json
- ru-RU.json
- tr-TR.json
- zh-CN.json

## Screenshots
![Navigation Information](https://raw.githubusercontent.com/meatlayer/ets2-mobile-route-advisor/master/screenshots/nav.jpg)
![Navigation Information2](https://raw.githubusercontent.com/meatlayer/ets2-mobile-route-advisor/master/screenshots/nav2.jpg)
![Cargo Information](https://raw.githubusercontent.com/meatlayer/ets2-mobile-route-advisor/master/screenshots/cargo.jpg)
![Damage Information](https://raw.githubusercontent.com/meatlayer/ets2-mobile-route-advisor/master/screenshots/damage.jpg)

## Contributors
<table>
    <tr>
        <th>Development</th>
        <th>Translations</th>
        <th>Map</th>
    </tr>
    <tr>
        <td valign="top">
            <ul>
                <li><a href="https://github.com/meatlayer">meatlayer</a></li>
                <li><a href="https://github.com/meatlayer">mike-koch</a></li>
                <li><a href="https://github.com/denilsonsa">denilsonsa</a></li>
                <li><a href="https://github.com/Koenvh1">Koen</a></li>
            </ul>
        </td>
        <td valign="top">
            <ul>
                <li><a href="https://github.com/meatlayer">mike-koch</a></li>
                <li><a href="https://github.com/Phil0499">Phil0499</a></li>
                <li><a href="https://github.com/raflix261">raflix261</a></li>
                <li><a href="https://github.com/pedropandolfi">pedropandolfi</a></li>
                <li><a href="http://forum.scssoft.com/memberlist.php?mode=viewprofile&u=127033">MinecraftMarioGuy53</a></li>
                <li><a href="http://forum.scssoft.com/memberlist.php?mode=viewprofile&u=3710">SchorschiBW</a></li>
                <li><a href="https://github.com/denilsonsa">denilsonsa</a></li>
                <li>Frank Kristensen</li>
            </ul>
        </td>
        <td valign="top">
            <ul>
				<li><a href="https://github.com/meatlayer">meatlayer</a></li>
                <li><a href="https://github.com/Funbit">Funbit</a></li>
                <li><a href="https://github.com/Koenvh1">Koen</a></li>
            </ul>
        </td>
    </tr>
</table>
