<?php

#localhost:3306
#premw
#user logoss
#,B[94#^.[v%X
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);

date_default_timezone_set('America/New_York');

include 'settings.php';
if ($_POST['site'] == 'p') {

    session_start();
    if (!empty($_POST['fname']))
        $_SESSION['account']->firstName = $_POST['fname'];

    $_SESSION['goggins'] = $_POST['id'];
    header("Location: p.php");
    exit();
}
#session_destroy();
session_start();
$servername = "localhost";
$username = "";
$password = "";
$dbname = "p";

$conn = mysqli_connect($servername, $username, $password, $dbname, 8889);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$update = 0;
#update 1 = update function, update 2 = removing things or modifcation (prob not needed because javascript)
$rid = NULL;
$pr1sell = NULL;
$pr2sell = NULL;
$pr3sell = NULL;
$balanceTypes = ["Normal", "CashCard"];
$AcceptUrMoney = NULL;
$balanceType = NULL;
$preBalance = NULL;
$firstname = NULL;
$lastname = NULL;
$account = NULL;
$exp = $_GET['exp'];
$explevels = ["New", "Eh", "Long"];
$pr1 = NULL;
$pr2 = NULL;
$pr3 = NULL;
$orders = NULL;
$date = NULL;
#New = Less than 8 days since first payment.
#Eh = 8-17 days since first payment.
#Long = 17-31 days since first payment.
$bank = NULL;
$bankcolor = NULL;
$load = $_GET['load'];
$pr1store = "";
$pr2store = "";
$pr3store = "";
$date = NULL;
$ocount = NULL;

$card = NULL;
$cardnum = NULL;
$banknum = NULL;
$arraypr = [];

$itemarray = [];


#Function for adding products.
function ap($name, $price, $pic, $mailbox)
{
    global $itemarray;
    $item = new stdClass();
    $item->name = $name;
    $item->price = $price;


    $item->pic = implode('.', explode('.', $pic, -2)) . '._SX90_.jpg';
    $item->mailbox = $mailbox;


    $price = $item->price;
    $price = number_format($price, 2);
    $item->price = $price;

    $name = $item->name;
    $pic = $item->pic;
    $mailbox = $item->mailbox;
    $shipping = 0.00;
    $shipping = number_format(strval(rand(5, 7) . "." . strval(rand(10, 99))), 2);
    $total = $shipping + number_format($price, 2);

    $tax = 6.36 / 100;
    $tax = $tax * $total;

    $total = number_format($total + $tax, 2);
    $item->tax = $total;
    array_push($itemarray, $item);
}

#Declare products here.
#Editing these will screw up all current vouches!!!
function dP()
{
    ap('Gigabyte GeForce RTX 2070 Windforce 8G Graphics Card, 2X Windforce Fans, 8GB 256-Bit GDDR6, GV-N2070WF2-8GD Video Card', '549.99', 'https://m.media-amazon.com/images/I/61e+gWVT0oL._AC_UY218_.jpg', 0);
    ap('Gigabyte GV-N207SGAMING OC-8GD GeForce RTX 2070 Super Gaming OC 8G Graphics Card, 3X Windforce Fans, 8GB 256-Bit GDDR6, Video Card', '662.81', 'https://m.media-amazon.com/images/I/71QQYvO+eKL._AC_UY218_.jpg', 0);

    ap('MSI Gaming GeForce RTX 2070 8GB GDRR6 256-Bit HDMI/DP DirectX 12 VR Ready Ray Tracing Turing Architecture HDCP Graphics Card (RTX 2070 TRI FROZR), (Model: GeForce RTX 2070 TRI FROZR)', '489.00', 'https://m.media-amazon.com/images/I/61aejZmcT1L._AC_UY218_.jpg', 0);


    ap('HP 305A | CE305AQ1 | 4 Toner Cartridges | Black, Cyan, Magenta, Yellow', '438.99', 'https://m.media-amazon.com/images/I/718NtlUQ7sL._AC_UY218_.jpg', 0);
    ap('Bose Surround Speakers 700, Black', '499.00', 'https://m.media-amazon.com/images/I/71tLyj1IHPL._AC_UY218_.jpg', 0);

    ap('LG 34WN80C-B 34" 21:9 Curved UltraWide WQHD IPS Monitor, Black (2019) & Logitech MK270 Wireless Keyboard and Mouse Combo - Keyboard and Mouse Included, 2.4GHz Connection (Frustration-Free Packaging)', '530.49', 'https://m.media-amazon.com/images/I/51CjCxYXQ4L._AC_UY218_.jpg', 0);

    ap('Intel Core i9-9900K Desktop Processor 8 Cores up to 5.0 GHz Turbo unlocked LGA1151 300 Series 95W', '424.99', 'https://m.media-amazon.com/images/I/81meKnOusyL._AC_UY218_.jpg', 0);

    ap('TaylorMade SIM MAX Irons', '999.99', 'https://m.media-amazon.com/images/I/51WJqcn-MbL._AC_UY218_.jpg', 0);

    ap('TaylorMade Golf M2 Combo Set', '699.99', 'https://m.media-amazon.com/images/I/41VtXXADv7L._AC_UY218_.jpg', 0);

    ap('TaylorMade Golf M6 Iron', '599.99', 'https://m.media-amazon.com/images/I/51iena7pJ8L._AC_UY218_.jpg', 0);

    ap('TaylorMade Golf M2 Iron Set', '599.99', 'https://m.media-amazon.com/images/I/41DdvedSkJL._AC_UY218_.jpg', 0);

    ap('TaylorMade SIM MAX Irons', '899.99', 'https://m.media-amazon.com/images/I/51WJqcn-MbL._AC_UY218_.jpg', 0);

    ap('Samsung Business CH890 Series 34 inch WQHD 3440x1440 Ultrawide Curved Desktop Monitor for Business, 100 Hz, USB-C, HDMI, DP, 3 Year Warranty (LC34H890WGNXGO), Black/Titanium', '600.58', 'https://images-na.ssl-images-amazon.com/images/I/71HumjJiQAL._AC_SX450_.jpg', 0);
    ap('SAMSUNG 65-inch Class Curved UHD TU-8300 Series - 4K UHD HDR Smart TV With Alexa Built-in (UN65TU8300FXZA, 2020 Model)', '677.99', 'https://images-na.ssl-images-amazon.com/images/I/9138UedBC%2BL._AC_SX679_.jpg', 0);
    ap('New Apple AirPods Max - Space Gray', '549.00', 'https://images-na.ssl-images-amazon.com/images/I/81jqUPkIVRL._AC_SX342_.jpg', 1);
    ap('SAMSUNG HW-Q70T 3.1.2ch  Soundbar with Dolby Atmos / DTS:X (2020)', '597.99', 'https://images-na.ssl-images-amazon.com/images/I/81p3LqD4GEL._AC_SX355_.jpg', 0);
    ap('New Apple Watch Series 6 (GPS + Cellular, 44mm) - Blue Aluminum Case with Deep Navy Sport Band', '514.98', 'https://images-na.ssl-images-amazon.com/images/I/71sFZcRAtzL._AC_SX522_.jpg', 0);
    ap('NordicTrack T Series Treadmill', '719.75', 'https://images-na.ssl-images-amazon.com/images/I/61FiANR0DIL._AC_SX425_.jpg', 0);
    ap('New Apple iPad Air (10.9-inch, Wi-Fi, 64GB) - Space Gray (Latest Model, 4th Generation)', '599.00', 'https://images-na.ssl-images-amazon.com/images/I/71ammbDB5EL._AC_SX342_.jpg', 0);
    ap('Canon EOS REBEL T7 DSLR Camera|2 Lens Kit with EF18-55mm + EF 75-300mm Lens, Black', '549.00', 'https://images-na.ssl-images-amazon.com/images/I/71W1KvLH3sL._AC_SX355_.jpg', 0);
    ap('Dyson Pure Hot + Cool, HP01 HEPA Air Purifier, Space Heater & Fan, For Large Rooms, Removes Allergens, Pollutants, Dust, Mold, VOCs, White/Silver', '499.99', 'https://images-na.ssl-images-amazon.com/images/I/71SaoRgGyJL._AC_SY355_.jpg', 0);
    ap('Acer Predator XB271HU bmiprz 27" WQHD (2560x1440) NVIDIA G-SYNC IPS Monitor, (Display Port & HDMI Port, 144Hz), Black', '499.99', 'https://images-na.ssl-images-amazon.com/images/I/81FhIAXk0vL._AC_SY450_.jpg', 0);
    ap('DJI Mavic Air 2 - Drone Quadcopter UAV with 48MP Camera 4K Video 8K Hyperlapse 1/2" CMOS Sensor 3-Axis Gimbal 34min Flight Time ActiveTrack 3.0 Ocusync 2.0, Gray', '799.99', 'https://images-na.ssl-images-amazon.com/images/I/61H6sByGqbL._AC_SY355_.jpg', 0);
    ap('New Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Gold (Latest Model)', '999.99', 'https://images-na.ssl-images-amazon.com/images/I/71vFKBpKakL._AC_SX342_.jpg', 0);
    ap('Herman Miller Mirra 2 Chair - Tilt Limiter and Seat Angle, TriFlex Back', '709.11', 'https://images-na.ssl-images-amazon.com/images/I/71UzX5xBnML._AC_SY355_.jpg', 0);
    ap('Arlo Ultra 2 Spotlight Camera | 2 Camera Security System | Wire-Free, 4K Video & HDR | Color Night Vision, 2-Way Audio, 6-Month Battery Life | Works with Alexa | White | VMS5240-200NAS', '499.99', 'https://images-na.ssl-images-amazon.com/images/I/71CXBgl47TL._AC_SX355_.jpg', 0);
    ap('KitchenAid KP26M1XER 6 Qt. Professional 600 Series Bowl-Lift Stand Mixer - Empire Red', '499.99', 'https://images-na.ssl-images-amazon.com/images/I/81BOGWDXGHL._AC_SY450_.jpg', 0);

    ap('DEWALT 20V (DCK940D2) Max Cordless Drill Combo Kit, 9-Tool', '499.00', 'https://images-na.ssl-images-amazon.com/images/I/71cAQ4M3JCL._AC_SX522_.jpg', 0);
    ap('Dyson Slim-Ball Multi Floor Animal Vacuum Cleaner: High Performance, HEPA Filter, Upright, Bagless, Height Adjustment, Telescopic Handle, Self Propelled, Rotating Brushes, Purple + iCarp Sponge Cloth', '469.00', 'https://images-na.ssl-images-amazon.com/images/I/71wdvyMDq1L._AC_SY450_.jpg', 0);
    ap('LG Cordzero A9 Kompressor, Two Batteries, for Carpet, Couch, Mattress, Car, (A927KGMS) Cordless Stick Vacuum, Matte Grey', '691.99', 'https://images-na.ssl-images-amazon.com/images/I/51hQsS6BPkL._AC_SX450_.jpg', 0);
    ap('Shark IQ Robot Vacuum AV1002AE with XL Self-Empty Base, Self-Cleaning Brushroll, Advanced Navigation, Wi-Fi, Works with Alexa, 2nd Generation', '549.99', 'https://images-na.ssl-images-amazon.com/images/I/81ZO-8rMkJL._AC_SY450_.jpg', 0);
    ap('iRobot Roomba S9 (9150) Robot Vacuum- Wi-Fi Connected, Smart Mapping, Powerful Suction, Works with Alexa, Ideal for Pet Hair, Works With Clean Base', '899.00', 'https://images-na.ssl-images-amazon.com/images/I/91jhyHnbp%2BL._AC_SY450_.jpg', 0);
    ap('Dupray ONE Plus Steam Cleaner', '699.99', 'https://images-na.ssl-images-amazon.com/images/I/61PUmEpusML._AC_SY450_.jpg', 0);
    ap('SIMPSON Cleaning PS3228 PowerShot Gas Pressure Washer Powered by Honda GX200, 3300 PSI at 2.5 GPM, Black', '529.00', 'https://images-na.ssl-images-amazon.com/images/I/917sCyghS0L._AC_SX425_.jpg', 0);
    ap('LUCID L300 Bed Base 5 Minute Assembly Adjustable, Queen, Charcoal', '552.49', 'https://images-na.ssl-images-amazon.com/images/I/71v7LKT6D5L._AC_SY355_.jpg', 0);
    ap('ZINUS Brock Metal and Wood Platform Bed Frame / Solid Acacia Wood Mattress Foundation / No Box Spring Needed / Easy Assembly, King', '581.00', 'https://images-na.ssl-images-amazon.com/images/I/71%2B886-FQ9L._AC_SY450_.jpg', 0);
    ap('ZINUS Josh Sofa Couch / Easy, Tool-Free Assembly, Beige', '453.54', 'https://images-na.ssl-images-amazon.com/images/I/91N7yBUrirL._AC_SY450_.jpg', 0);
    ap('Casa AndreaMilano Modern Large Velvet Fabric U-Shape Sectional Sofa, Double Extra Wide Chaise Lounge Couch, Ash', '756.41', 'https://images-na.ssl-images-amazon.com/images/I/61UQk0lErmL._AC_SY355_.jpg', 0);
    ap('CosmoLiving Strummer Reversible Sectional Couch, Black Velvet Sofa', '719.99', 'https://images-na.ssl-images-amazon.com/images/I/81GwCYWbDvL._AC_SY450_.jpg', 0);
    ap('Walker Edison Traditional Wood and Glass Stand with Cabinet Doors for TVs up to 80" Living Room Storage Shelves Entertainment Center, 70 Inch, Espresso', '483.99', 'https://images-na.ssl-images-amazon.com/images/I/81rjqrMih3L._AC_SY450_.jpg', 0);
    ap('SIMPLIHOME Artisan SOLID WOOD Universal TV Media Stand, 72 inch Wide, Contemporary, Storage Cabinet with Glass Doors, for Flat Screen TVs up to 80 inches, Natural Aged Brown', '527.85', 'https://images-na.ssl-images-amazon.com/images/I/81Dlp-aBHNL._AC_SY450_.jpg', 0);
    ap('Total Gym APEX G5 Versatile Indoor Home Workout Total Body Strength Training Fitness Equipment with 10 Levels of Resistance and Attachments', '499.00', 'https://images-na.ssl-images-amazon.com/images/I/61gBPrYiegL._AC_SX425_.jpg', 0);
    ap('LifePro Rumblex 4D Pro Vibration Plate - Whole Body Vibration Platform Exercise Machine - Home Workout Equipment for Weight Loss, Toning & Wellness - Full Bundle of Bands, Straps & Accessories', '499.99', 'https://images-na.ssl-images-amazon.com/images/I/71r2q6EFYzL._AC_SX425_.jpg', 0);
    ap('Senville SENL-12CD Mini Split Air Conditioner Heat Pump, 12000 BTU 19 SEER', '749.99', 'https://images-na.ssl-images-amazon.com/images/I/81Un4bmtzML._AC_SY450_.jpg', 0);
    ap('Black + Decker 7,500 BTU Portable Air Conditioner with Heat, 14,000 w, White', '479.99', 'https://images-na.ssl-images-amazon.com/images/I/71B%2B31whIHL._AC_SY450_.jpg', 0);
    ap('Ashley Hearth Products DVAG30L 25000 BTU Direct Vent Propane Heater, Cream', '760.90', 'https://images-na.ssl-images-amazon.com/images/I/71OaHugyyqL._AC_SX450_.jpg', 0);
    ap('Touchstone Sideline Recessed Mounted Electric Fireplaces (50 Inches)', '499.00', 'https://images-na.ssl-images-amazon.com/images/I/616LslXJn5L._AC_SX450_.jpg', 0);

    ap('Samsung Business CH890 Series 34 inch WQHD 3440x1440 Ultrawide Curved Desktop Monitor for Business, 100 Hz, USB-C, HDMI, DP, 3 Year Warranty (LC34H890WGNXGO), Black/Titanium', '596.96', 'https://images-na.ssl-images-amazon.com/images/I/71V9d00kQZL._AC_SX450_.jpg', 0);
    ap('LG 27GL850-B 27 Inch Ultragear QHD Nano IPS 1ms NVIDIA G-Sync Compatible Gaming Monitor', '446.99', 'https://images-na.ssl-images-amazon.com/images/I/81ZYbkU1uKL._AC_SX450_.jpg', 0);
    ap('LG 38WK95C-W 38-Inch Class 21:9 Curved UltraWide WQHD+ Monitor with HDR 10 (2019)', '979.00', 'https://images-na.ssl-images-amazon.com/images/I/81rbQdqbDiL._AC_SY450_.jpg', 0);
    ap('ASUS TUF Gaming VG27AQL1A 27” HDR Monitor, 1440P WQHD (2560 x 1440), 170Hz (Supports 144Hz), IPS, 1ms, G-SYNC Compatible, Extreme Low Motion Blur Sync, HDR400, 130% sRGB, Eye Care, HDMI DisplayPort', '579.00', 'https://images-na.ssl-images-amazon.com/images/I/81p88rY2tLL._AC_SY450_.jpg', 0);
    ap('LG 55UN7300PUF 55 inch UHD 4K HDR AI Smart TV 2020 Model Bundle with 1 Year Extended Protection Plan', '519.99', 'https://images-na.ssl-images-amazon.com/images/I/61qmKSEVE4L._AC_SY355_.jpg', 0);
    ap('Sony X800H 55 Inch TV: 4K Ultra HD Smart LED TV with HDR and Alexa Compatibility - 2020 Model', '798.00', 'https://images-na.ssl-images-amazon.com/images/I/71%2BF%2BeS7qfL._AC_SY355_.jpg', 0);
    ap('LG Gram Laptop - 15.6" Full HD IPS, Intel 10th Gen Core i5 (10210U CPU), 8GB DDR4 2666MHz RAM, 512GB NVMeTM SSD, Up to 21 Hours Battery, Intel UHD Graphics - 15Z995-U.ARS6U1 (2020)', '896.99', 'https://images-na.ssl-images-amazon.com/images/I/81pKKYJBeYL._AC_SY450_.jpg', 0);
    ap('Microsoft Surface Pro 7 – 12.3" Touch-Screen - Intel Core i5 - 8GB Memory - 256GB SSD(Latest Model) – Platinum (PUV-00001)', '899.00', 'https://m.media-amazon.com/images/I/51q9Sk2WUBL._AC_SX450_.jpg', 0);
    ap('Microsoft Surface Laptop Go - 12.4" Touchscreen - Intel Core i5 - 8GB Memory - 128GB SSD - Platinum', '649.00', 'https://images-na.ssl-images-amazon.com/images/I/61OvV27-44L._AC_SX450_.jpg', 0);
    ap('iBUYPOWER Gaming PC Computer Desktop Trace 4 9310 (AMD Ryzen 5 3600 3.6GHz, AMD Radeon RX 5500 XT 4GB, 8GB DDR4 RAM, 240GB SSD, WiFi Ready, Windows 10 Home)', '890.98', 'https://images-na.ssl-images-amazon.com/images/I/71CyfrhCZ1L._AC_SY450_.jpg', 0);
    ap('CyberpowerPC Gamer Xtreme VR Gaming PC, Intel i5-10400F 2.9GHz, GeForce GTX 1660 Super 6GB, 8GB DDR4, 500GB NVMe SSD, WiFi Ready & Win 10 Home (GXiVR8060A10)', '972.00', 'https://images-na.ssl-images-amazon.com/images/I/81Wx7hw9vwL._AC_SY450_.jpg', 0);
    ap('AMD Ryzen 9 3900X 12-core, 24-thread unlocked desktop processor with Wraith Prism LED Cooler', '499.00', 'https://images-na.ssl-images-amazon.com/images/I/71S31CWSs3L._AC_SX450_.jpg', 0);
    ap('AMD-Ryzen 7 5800X 4th Gen 8-core Desktop Processor Without Cooler, 16-Threads Unlocked, 3.8 GHz Up to 4.7 GHz, Socket AM4, Zen 3 Core Architecture, StoreMI Technology w/Mytrix HDMI Cable', '699.99', 'https://images-na.ssl-images-amazon.com/images/I/51ehZi8K6-L._AC_SY355_.jpg', 0);
    ap('Intel Core i9-10900K Desktop Processor 10 Cores up to 5.3 GHz Unlocked  LGA1200 (Intel 400 Series Chipset) 125W', '514.89', 'https://images-na.ssl-images-amazon.com/images/I/61caiXzJ1sL._AC_SX466_.jpg', 0);
    ap('Serta Big and Tall Executive Office Chair with AIR Technology and Smart Layers Premium Elite Foam, Supports up to 400 Pounds, Bonded Leather - Black', '532.39', 'https://images-na.ssl-images-amazon.com/images/I/81543OkQKhL._AC_SX450_.jpg', 0);
    ap('MOOJIRS Ergonomic office chair with adjustable cushion depth | Mesh backrest | Adjustable lumbar support | Adjustable 3D armrest|Adjustable chair back elasticity and tilt angle|Standard carpet casters', '497.00', 'https://images-na.ssl-images-amazon.com/images/I/71DP3N6cDfL._AC_SY450_.jpg', 0);
    ap('AKRacing Masters Series Max Gaming Chair with Wide Flat Seat, 400 Lbs Weight Limit, Rocker and Seat Height Adjustment Mechanisms with 5/10 Warranty', '459.00', 'https://images-na.ssl-images-amazon.com/images/I/51WmdFSGJrL._AC_SY450_.jpg', 0);
    ap('FEZIBO Dual Motor Height Adjustable Electric Standing Desk with Keyboard Tray, 63 x 24 Inch Sit Stand Table with Splice Board, White Frame/Natural and White Top', '409.99', 'https://images-na.ssl-images-amazon.com/images/I/61%2BqCCwkd8L._AC_SY450_.jpg', 0);
    ap('ApexDesk Elite Series 60" W Electric Height Adjustable Standing Desk (Memory Controller, 60" Black Top, Black Frame)', '601.49', 'https://images-na.ssl-images-amazon.com/images/I/710iEgtIiTL._AC_SX355_.jpg', 0);
    ap('New Apple iPad Pro (11-inch, Wi-Fi, 256GB) - Space Gray (2nd Generation)', '845.92', 'https://images-na.ssl-images-amazon.com/images/I/815ztYEEwYL._AC_SX342_.jpg', 0);
    ap('Google Pixel 4a with 5G - Android Phone - New Unlocked Smartphone with Night Sight and Ultrawide Lens - Just Black', '499.00', 'https://images-na.ssl-images-amazon.com/images/I/71C0OH4WfpL._AC_SX522_.jpg', 1);
    ap('Apple MacBook Air (13-inch Retina Display, 8GB RAM, 256GB SSD Storage) - Space Gray (Previous Model)', '799.99', 'https://images-na.ssl-images-amazon.com/images/I/71k3fJh5EwL._AC_SX342_.jpg', 0);
    ap('New Apple Mac Mini with Apple M1 Chip (8GB RAM, 256GB SSD Storage) - Latest Model', '669.99', 'https://images-na.ssl-images-amazon.com/images/I/71pcTYT%2BICL._AC_SX342_.jpg', 0);
    ap('LG 27UK850-W 27" 4K UHD IPS Monitor with HDR10 with USB Type-C Connectivity and FreeSync, White', '449.97', 'https://images-na.ssl-images-amazon.com/images/I/718ICn8vZTL._AC_SY450_.jpg', 0);
    ap('Dell U-Series 38" Screen LED-Lit Monitor (U3818DW), Black', '998.75', 'https://images-na.ssl-images-amazon.com/images/I/71IjK1dq-OL._AC_SY355_.jpg', 0);
    ap('LG 27UN880-B – 27” UHD (3840 x 2160) Ergo IPS Ultrafine Monitor with sRGB 99% Color Gamut, VESA DisplayHDR 400 and USB Type-C (60W PD) -Black', '598.53', 'https://m.media-amazon.com/images/I/81NtmsJFh2L._AC_SY450_.jpg', 0);
    ap('HP Z43 42.5 Inch 4K UHD 3840 x 2160 LED Backlit Gaming Monitor with IPS, Vesa Compatible, Anti-Glare, Tilt and Swivel, Black Pearl (USB-C, HDMI and DisplayPort)', '759.00', 'https://images-na.ssl-images-amazon.com/images/I/91Ts1q3EKvL._AC_SX450_.jpg', 0);
    ap('LG 43UN700-B 43 Inch Class UHD (3840 X 2160) IPS Display with USB Type-C and HDR10 with 4 HDMI inputs, Black', '579.00', 'https://images-na.ssl-images-amazon.com/images/I/81LZaf9lHSL._AC_SY450_.jpg', 0);

}

dP();


function dcard()
{
    global $bank;
    $boa = ['Bank of America Cash Rewards Visa Credit Card', 'Credit', 'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/NjY2MzBmYmItMDFiOC00ZTZlLWJmMGUtNWRhMjhhYzM5ZjRm/image__7.png'];
    $chasedebit = ['Chase Debit Card', 'Debit', 'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/NjU4Mjg1NzYtODY0Yy00MTg1LTliZTAtMTA2OWMwNzQ5ZDU4/image__7.png'];
    $chasecredit = ['Chase Credit Card', 'Credit', 'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/NjU4Mjg1NzYtODY0Yy00MTg1LTliZTAtMTA2OWMwNzQ5ZDU4/image__7.png'];
    $emvdebit = ['Debit EMV Bank', 'Debit', 'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/MDQyYWE0MzYtN2FlOS00ODMxLWE4NzctMGQ5YWQyY2M5OTcx/image__7.png'];
    $visaprepaid = ['Visa', 'Prepaid', 'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/ODI3NzMyNTYtODZmOS00NjhhLWJmNTctMDk1ZWUzM2Q5Mzll/image__7.png'];

    $amexcredit = ['American Express', 'Credit', 'https://i.imgur.com/DfmYN0q.png'];
    $amexdebit = ['American Express', 'Debit', 'https://i.imgur.com/DfmYN0q.png'];

    $tddebit = ['TD Bank Visa Debit Card', 'Debit', 'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/OTY0ZmMxODItNDY3OS00MDUyLWJmNzAtMzFkMzQwZWQxMGQ3/image__7.png'];
    $tdcredit = ['TD Bank Visa Credit Card', 'Credit', 'https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/OTY0ZmMxODItNDY3OS00MDUyLWJmNzAtMzFkMzQwZWQxMGQ3/image__7.png'];

    $citipremier = ['Citibank Visa Signature Card', 'Credit', 'https://i.imgur.com/DUHTnvY.png'];

    $card = ['Citibank Visa Signature Card', 'Credit', 'https://i.imgur.com/DUHTnvY.png'];
    if ($bank == "JPMORGAN CHASE") {
        $cd = rand(1, 2);
        if ($cd == 1) {
            $card = $chasecredit;
        }
        if ($cd == 2) {
            $card = $chasedebit;
        }
    } else if ($bank == "TD BANK") {
        $cd = rand(1, 2);
        if ($cd == 1) {
            $card = $tdcredit;
        }
        if ($cd == 2) {
            $card = $tddebit;
        }
    } else if ($bank == "U.S. BANK") {
        $cd = rand(1, 2);
        if ($cd == 1) {
            $card = $amexcredit;
        }
        if ($cd == 2) {
            $card = $amexdebit;
        }
    } else if ($bank == "EMV BANK") {

        $card = $emvdebit;

    } else if ($bank == "CITIBANK") {

        $card = $citipremier;

    } else {
        $card = $visaprepaid;
    }

    return $card;
}

#Formats account settings to one variable.
function accountSetup()
{
    global $balanceType;
    global $preBalance;
    global $firstname;
    global $lastname;
    global $exp;
    global $account;
    global $bank;
    global $bankcolor;
    global $rid;
    global $AcceptUrMoney;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    global $date;
    global $pr1ship;
    global $pr2ship;
    global $pr3ship;

    $account = new stdClass();
    $account->firstName = $firstname;
    $account->lastName = $lastname;
    $account->exp = $exp;
    $account->preBal = $preBalance;
    $account->acceptUrMoney = $AcceptUrMoney;
    $account->balType = $balanceType;
    $account->bank = $bank;
    $account->bankcolor = $bankcolor;
    $account->id = $rid;
    $account->card = dcard();
    $account->cardnum = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
    $account->banknum = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
    $account->date = $date;
    $account->pr1 = $pr1;
    $account->pr2 = $pr2;
    $account->pr3 = $pr3;
    $account->pr1sell = $pr1sell;
    $account->pr2sell = $pr2sell;
    $account->pr3sell = $pr3sell;
    $account->pr1ship = $pr1ship;
    $account->pr2ship = $pr2ship;
    $account->pr3ship = $pr3ship;
    $account->balance = 0.00;
    $account->onHold = 0.00;


}


$orders = [];
function ae($date, $type, $fname, $lname, $pr)
{
    global $orders;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    global $ocount;
    $order = new stdClass();
    $order->days = rand(3, 4);
    $order->ee = rand(1, 5);
    $order->date = $date;

    $order->type = $type;
    $order->fname = $fname;
    $order->lname = $lname;
    $order->ebayID = strval(rand(111111111111, 999999999999));
    $order->ebayON = strval(rand(11, 99)) . "-" . strval(rand(11111, 99999)) . "-" . strval(rand(11111, 99999));
    //echo $order->ebayID;
    //echo $order->ebayON;
    $order->item = $pr;
    if ($pr == $pr1) {
        $order->sellfor = $pr1sell;
        $order->num = 1;
    }
    if ($pr == $pr2) {
        $order->sellfor = $pr2sell;
        $order->num = 2;
    }
    if ($pr == $pr3) {
        $order->sellfor = $pr3sell;
        $order->num = 3;
    }
    array_push($orders, $order);
    $ocount += 1;
}

function aefront($olist, $date, $type, $fname, $lname, $pr)
{
    global $orders;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    global $ocount;

    $order = new stdClass();
    $order->days = rand(3, 4);
    $order->ee = rand(1, 5);
    $order->date = $date;
    $order->type = $type;
    $order->fname = $fname;
    $order->lname = $lname;
    $order->item = $pr;
    if ($pr == $pr1) {
        $order->sellfor = $pr1sell;
        $order->num = 1;
    }
    if ($pr == $pr2) {
        $order->sellfor = $pr2sell;
        $order->num = 2;
    }
    if ($pr == $pr3) {
        $order->sellfor = $pr3sell;
        $order->num = 3;
    }
    array_unshift($olist, $order);
    $ocount += 1;
    return $olist;
}

function ab($date, $orderlist)
{
    global $orders;
    global $ocount;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    $amount = 0;
    foreach ($orderlist as $value) {
        if ($value == $pr1)
            $amount += $pr1sell;
        if ($value == $pr2)
            $amount += $pr2sell;
        if ($value == $pr3)
            $amount += $pr3sell;
    }

    $bankorder = new stdClass();
    $bankorder->date = $date;
    $bankorder->type = "BANK";
    $bankorder->amount = $amount;
    array_push($orders, $bankorder);
    $ocount += 1;
}

function abfront($date, $orderlist, $amount)
{
    global $orders;
    global $ocount;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    $olist = $orderlist;
    $bankorder = new stdClass();
    $bankorder->date = $date;
    $bankorder->type = "BANK";
    $bankorder->amount = $amount;
    array_unshift($olist, $bankorder);
    $ocount += 1;
    return $olist;
}

function abfrontl($date, $orderlist, $prodlist)
{
    global $orders;
    global $ocount;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    $amount = 0;
    foreach ($prodlist as $value) {
        if ($value == $pr1)
            $amount += $pr1sell;
        if ($value == $pr2)
            $amount += $pr2sell;
        if ($value == $pr3)
            $amount += $pr3sell;
    }
    $olist = $orderlist;
    $bankorder = new stdClass();
    $bankorder->date = $date;
    $bankorder->type = "BANK";
    $bankorder->amount = $amount;
    array_unshift($olist, $bankorder);
    $ocount += 1;
    return $olist;
}

function genOrders()
{
    global $exp;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    global $firstnames;
    global $lastnames;
    global $arraypr;
    global $account;
    global $ocount;
    global $date;
    #ON HOLD ORDER SECTION-----------------
    #60% chance for on hold orders.
    $holdcount = 0;
    $onholds = rand(0, 10);
    if ($onholds <= 6) {
        #1/2 chance for onHoldNoShip.
        #1/2 chance for onHoldShip.
        $which = rand(0, 2);

        if ($which == 1) {
            #1/2 chance for just one of me.
            $which = rand(1, 3);
            if ($which == 1 || $which == 3) {
                $pickedPR = $arraypr[array_rand($arraypr)];
                ae($date, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                if ($pickedPR == $pr1)
                    $account->onHold += $pr1sell;
                if ($pickedPR == $pr2)
                    $account->onHold += $pr2sell;
                if ($pickedPR == $pr3)
                    $account->onHold += $pr3sell;
                $holdcount = 1;
            }
            if ($which == 2) {
                #1/2 chance for two of me.
                $which = rand(1, 3);
                if ($which == 1) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($date, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($date, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $holdcount = 2;
                }
                #1/2 chance for one onHoldShip.
                if ($which == 2 || $which == 3) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($date, "holdnoship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($date, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $holdcount = 2;
                }
            }
        } elseif ($which == 2) {
            #1/2 chance for just one of me.
            $which = rand(1, 3);
            if ($which == 1 || $which == 3) {
                $pickedPR = $arraypr[array_rand($arraypr)];
                ae($date, "holdnoship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                if ($pickedPR == $pr1)
                    $account->onHold += $pr1sell;
                if ($pickedPR == $pr2)
                    $account->onHold += $pr2sell;
                if ($pickedPR == $pr3)
                    $account->onHold += $pr3sell;
                $holdcount = 1;
            }
            if ($which == 2) {


                $which = rand(1, 2);
                #1/2 chance for one onHoldNoShip.
                if ($which == 1) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($date, "holdnoship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($date, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $holdcount = 2;

                }
                #1/2 chance for two of me.
                if ($which == 2) {
                    ae($date, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $arraypr[array_rand($arraypr)]);
                    ae($date, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $arraypr[array_rand($arraypr)]);
                    $holdcount = 2;
                }
            }
        }
    }


    #COMPLETED ORDER SECTION----------
    $days = 0;


    if ($exp == "New") {
        $days = rand(3, 8);
    }
    if ($exp == "Eh") {
        $days = rand(7, 17);
    }
    if ($exp == "Long") {
        $days = rand(16, 31);
    }

    for ($i = 0; $i <= $days; $i++) {
        $thedate = date('M j, Y', strtotime("-" . strval($i) . " days"));
        #Same day
        $count = 0;
        if ($i == 0) {
            if ($holdcount == 0) {
                $count = rand(0, 2);
                for ($w = 0; $w < $count; $w++) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($thedate, "complete", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->balance += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->balance += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->balance += $pr3sell;
                }
            }
            if ($holdcount == 1) {
                $count = rand(0, 2);
                for ($w = 0; $w < $count; $w++) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($thedate, "complete", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->balance += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->balance += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->balance += $pr3sell;
                }
            }
            if ($holdcount == 2) {
                $count = rand(0, 1);
                for ($w = 0; $w < $count; $w++) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    ae($thedate, "complete", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->balance += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->balance += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->balance += $pr3sell;
                }
            }
        } else {
            #ab($thedate,"");
            $count = rand(0, 3);
            if ($count == 3)
                $count = $count - rand(1, 2);
            $third = rand(0, 3);
            if ($third == 3)
                $count += 1;
            $lis = [];
            for ($w = 0; $w < $count; $w++) {
                $myItem = $arraypr[array_rand($arraypr)];
                #print_r($lis);
                array_push($lis, $myItem);
                #ae($thedate,"complete", $firstnames[array_rand($firstnames)],$lastnames[array_rand($lastnames)],$arraypr[array_rand($arraypr)]);
            }
            if ($count > 0) {
                $hmm = rand(0, 2);
                if ($hmm == 2) {
                    ab(date('M j, Y', strtotime("-" . strval($i - 1) . " days")), $lis);
                } else {
                    ab($thedate, $lis);
                }

            }
            for ($w = 0; $w < $count; $w++) {
                ae($thedate, "complete", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $lis[$w]);
            }

        }
    }


}

function modgenOrders($days, $date, $olist, $stopdate)
{
    global $exp;
    global $pr1;
    global $pr2;
    global $pr3;
    global $pr1sell;
    global $pr2sell;
    global $pr3sell;
    global $firstnames;
    global $lastnames;
    global $arraypr;
    global $account;
    global $ocount;
    $account->onHold = 0.00;
    $account->balance = 0.00;
    #ON HOLD ORDER SECTION-----------------
    #60% chance for on hold orders.
    $holdcount = 0;

    $days = 30;

    #COMPLETED ORDER SECTION----------
    $thedate = strtotime($date);

    for ($i = 0; $i < $days; $i++) {
        $thedate = strtotime("+" . strval($i) . " days", strtotime($date));
        #$thedate = strftime('%b %-d, %Y',$thedate);
        $old = $stopdate;
        $stopdate = strtotime($stopdate);
        if ($thedate > $stopdate) {
            $thedate = strftime('%b %-d, %Y', $thedate);
            $stopdate = $old;
            break;
        }
        $thedate = strftime('%b %-d, %Y', $thedate);
        $stopdate = $old;
        #Same day
        $count = 0;
        if ($i == 0) {

        } else {
            #ab($thedate,"");
            $count = rand(0, 3);
            if ($count == 3)
                $count = $count - rand(1, 2);
            $third = rand(0, 3);
            if ($third == 3)
                $count += 1;
            $lis = [];
            for ($w = 0; $w < $count; $w++) {
                $myItem = $arraypr[array_rand($arraypr)];

                array_push($lis, $myItem);
                #ae($thedate,"complete", $firstnames[array_rand($firstnames)],$lastnames[array_rand($lastnames)],$arraypr[array_rand($arraypr)]);
            }

            for ($w = 0; $w < $count; $w++) {

                $olist = aefront($olist, $thedate, "complete", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $lis[$w]);

            }
            if ($count > 0) {
                $hmm = rand(0, 2);
                if ($hmm == 2) {

                    $addb = strtotime("+1 days", strtotime($thedate));
                    if ($addb > strtotime($stopdate))
                        $addb = strtotime($thedate);
                    $addb = strftime('%b %-d, %Y', $addb);
                    $olist = abfrontl($addb, $olist, $lis);
                } else {
                    $olist = abfrontl($thedate, $olist, $lis);
                }

            }

        }
    }
    $onholds = rand(0, 10);
    if ($onholds <= 6) {
        #1/2 chance for onHoldNoShip.
        #1/2 chance for onHoldShip.
        $which = rand(0, 2);

        if ($which == 1) {
            #1/2 chance for just one of me.
            $which = rand(1, 3);
            if ($which == 1 || $which == 3) {
                $pickedPR = $arraypr[array_rand($arraypr)];
                $olist = aefront($olist, $stopdate, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                if ($pickedPR == $pr1)
                    $account->onHold += $pr1sell;
                if ($pickedPR == $pr2)
                    $account->onHold += $pr2sell;
                if ($pickedPR == $pr3)
                    $account->onHold += $pr3sell;
                $holdcount = 1;
            }
            if ($which == 2) {
                #1/2 chance for two of me.
                $which = rand(1, 3);
                if ($which == 1) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    $olist = aefront($olist, $stopdate, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    $olist = aefront($olist, $stopdate, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $holdcount = 2;
                }
                #1/2 chance for one onHoldShip.
                if ($which == 2 || $which == 3) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    $olist = aefront($olist, $stopdate, "holdnoship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    $olist = aefront($olist, $stopdate, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $holdcount = 2;
                }
            }
        } elseif ($which == 2) {
            #1/2 chance for just one of me.
            $which = rand(1, 3);
            if ($which == 1 || $which == 3) {
                $pickedPR = $arraypr[array_rand($arraypr)];
                $olist = aefront($olist, $stopdate, "holdnoship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                if ($pickedPR == $pr1)
                    $account->onHold += $pr1sell;
                if ($pickedPR == $pr2)
                    $account->onHold += $pr2sell;
                if ($pickedPR == $pr3)
                    $account->onHold += $pr3sell;
                $holdcount = 1;
            }
            if ($which == 2) {


                $which = rand(1, 2);
                #1/2 chance for one onHoldNoShip.
                if ($which == 1) {
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    $olist = aefront($olist, $stopdate, "holdnoship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $pickedPR = $arraypr[array_rand($arraypr)];
                    $olist = aefront($olist, $stopdate, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $pickedPR);
                    if ($pickedPR == $pr1)
                        $account->onHold += $pr1sell;
                    if ($pickedPR == $pr2)
                        $account->onHold += $pr2sell;
                    if ($pickedPR == $pr3)
                        $account->onHold += $pr3sell;
                    $holdcount = 2;

                }
                #1/2 chance for two of me.
                if ($which == 2) {
                    $olist = aefront($olist, $stopdate, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $arraypr[array_rand($arraypr)]);
                    $olist = aefront($olist, $stopdate, "holdship", $firstnames[array_rand($firstnames)], $lastnames[array_rand($lastnames)], $arraypr[array_rand($arraypr)]);
                    $holdcount = 2;
                }
            }
        }

    }
    return $olist;


}

function updatedate($orderlist, $newdate)
{
    $newdate = strtotime($newdate);
    $olddate = NULL;
    $p = 0;
    $ol = $orderlist;
    $amt = 0.00;
    $tobank = true;
    foreach ($ol as $o) {

        $amt += $ol[$p]->sellfor;

        if ($p == 0) {
            $olddate = $o->date;
            $olddate = strtotime($olddate);
            if ($ol[$p]->type == "BANK") {
                $tobank = false;
                break;

            }

        }
        if ($o->type == "holdship") {
            $ol[$p]->type = "complete";
        }
        if ($o->type == "holdnoship") {
            $ol[$p]->type = "complete";

        }
        $p += 1;


        if ($ol[$p]->type == "BANK")
            break;
    }

    if ($tobank == true) {

        $ol = abfront(date('M j, Y', $olddate), $ol, $amt);


    }
    $datediff = $newdate - $olddate;
    $nd = (new DateTime())->setTimestamp($newdate);
    $od = (new DateTime())->setTimestamp($olddate);

    $days = intval($nd->diff($od)->format("%a"));
    $ol = modgenOrders($days, strftime('%b %-d, %Y', $olddate), $ol, strftime('%b %-d, %Y', $newdate));
    return $ol;
}

if ($update == 0 && $load != 1) {
    $date = date('M j, Y');
    $rid = rand(0, 999999);
    if (!empty($_POST['sid'])) {
        $rid = intval($_POST['sid']);
    }

    srand($rid);
    function random_color_part()
    {
        return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
    }

    function random_color()
    {
        return random_color_part() . random_color_part() . random_color_part();
    }

    $bank = $banks[array_rand($banks)];
    $bankcolor = random_color();
    $firstname = $firstnames[array_rand($firstnames)];
    $lastname = $lastnames[array_rand($lastnames)];
    if (!isset($_GET['exp'])) {
        $exp = $explevels[array_rand($explevels)];
    }

    $balanceType = $balanceTypes[array_rand($balanceTypes)];
    $AcceptUrMoney = rand(0, 1);
    $preBalance = rand(300.00, 2900.00);
    $pr1 = $itemarray[array_rand($itemarray)];
    $pr2 = $itemarray[array_rand($itemarray)];
    $pr3 = $itemarray[array_rand($itemarray)];
    $pr1sell = $pr1->price - number_format(rand(45, 79) . "." . rand(10, 99), 2);
    $pr2sell = $pr2->price - number_format(rand(45, 79) . "." . rand(10, 99), 2);
    $pr3sell = $pr3->price - number_format(rand(45, 79) . "." . rand(10, 99), 2);
    $pr1ship = "$" . strval(rand(7, 25)) . "." . strval(rand(11, 99));
    $pr2ship = "$" . strval(rand(7, 25)) . "." . strval(rand(11, 99));
    $pr3ship = "$" . strval(rand(7, 25)) . "." . strval(rand(11, 99));
    $arraypr = [$pr1, $pr2, $pr3];
    accountSetup();
    genOrders();
#print_r($orders);
    $orderjson = json_encode($orders);
    $accountjson = json_encode($account);
    $deayt = date('M j, Y', strtotime($account->date));
    if (!empty($_POST['savename'])) {
        echo $_POST['savename'];
        $sname = $_POST['savename'];
        $sql = "INSERT INTO saves (GID,savename, account, orders, lastdate) VALUES ($account->id,'$sname', '$accountjson', '$orderjson','$deayt')";
        $conn->query($sql);
    }
#$sql = "INSERT INTO saves (gid,savename, account, orders, lastdate)
#VALUES ($account->id,'test', '$accountjson', '$orderjson','$date')";
#$result = $conn->query($sql);

    if (!empty($_GET['loadname'])) {
        $loadn = $_GET['loadname'];


        $sql = "SELECT * FROM saves WHERE savename='$loadn'";
        $result = $conn->query($sql);

        if (mysqli_num_rows($result) == 0) {
            // Do your while loop here
            $sname = $loadn;
            $sql = "INSERT INTO saves (GID,savename, account, orders, lastdate) VALUES ($account->id,'$sname', '$accountjson', '$orderjson','$deayt')";
            $conn->query($sql);

            $_SESSION['account'] = $account;
            $_SESSION['orders'] = $orders;


            if ($_GET['go'] == 'yes') {

                #session_start();

                #$_SESSION['goggins'] = $_POST['id'];
                if (!empty($_POST['fname']))
                    $_SESSION['account']->firstName = $_POST['fname'];

                $_SESSION['goggins'] = $rid;
                header("Location: p.php");

            }
        } else {

            $newaccount = "";
            $neworder = "";
            $lastdate = "";
            while ($row = $result->fetch_assoc()) {
                $newaccount = $row['account'];
                $neworder = $row['orders'];
                $lastdate = $row['lastdate'];
                #print_r(json_decode($newaccount));
            }

            $account = json_decode($newaccount);
            $orders = json_decode($neworder);
            $pr1 = $account->pr1;
            $pr2 = $account->pr2;
            $pr3 = $account->pr3;
            $pr1sell = $account->pr1sell;
            $pr2sell = $account->pr2sell;
            $pr3sell = $account->pr3sell;
            $arraypr = [$pr1, $pr2, $pr3];
            if (!empty($_GET['update'])) {

                $updatedate = $_GET['update'];
                $hours = date('G', strtotime($updatedate));
                $dayt = date('M j, Y', strtotime($updatedate));
                $account->hour = intval($hours);
                $account->date = $updatedate;
                #if($dayt != $date)
                $orders = updatedate($orders, $updatedate);
                $p = 0;
                foreach ($orders as $or) {
                    echo "ss";
                    if (isset($or->ebayID) == false) {
                        echo "dd";
                        $orders[$p]->ebayID = strval(rand(111111111111, 999999999999));
                        $orders[$p]->ebayON = strval(rand(11, 99)) . "-" . strval(rand(11111, 99999)) . "-" . strval(rand(11111, 99999));

                    }
                    $p = $p + 1;
                }
                if (!empty($_GET['saveit'])) {
                    $orderjson = json_encode($orders);
                    $accountjson = json_encode($account);
                    $deayt = date('M j, Y', strtotime($account->date));
                    $dayt = date('M j, Y', strtotime($lastdate));
                    if ($dayt != $deayt) {
                        $sql = "DELETE FROM saves WHERE savename='$loadn'";
                        $conn->query($sql);


                        $sql = "INSERT INTO saves (GID,savename, account, orders, lastdate) VALUES ($account->id,'$loadn', '$accountjson', '$orderjson','$deayt')";
                        $conn->query($sql);
                    }


                }
            } else {
                $account->hour = intval(date('G'));
            }
            $rid = $account->id;
        }
    }

#session variables to fix relaod issue when posting / getting !!!!!!!!!!!!!!!

}
#if($exp == "Eh")
#{
# if(rand(0,1) == 1)
#$account->preBal = 0.00;
#}

$_SESSION['account'] = $account;

$_SESSION['orders'] = $orders;


if ($_GET['go'] == 'yes') {

    #session_start();

    #$_SESSION['goggins'] = $_POST['id'];
    if (!empty($_POST['fname']))
        $_SESSION['account']->firstName = $_POST['fname'];

    $_SESSION['goggins'] = $rid;
    header("Location: p.php");

}
?>
<html>
<body>

<form action="builder.php" method="post">

    ID: <input type="text" name="id" value="<?php echo $rid ?>" style="width: 60px;"><br>

    Site: <input type="text" name="site" value="p" style="width: 20px;"><br>

    Date: <input type="text" name="date" style="width: 80px;" value= <?php echo "'";
    echo $date;
    echo "'"; ?>

    Bank: <input type="text" name="bank" style="width: 120px;" value="<?php echo $account->bank; ?>">

    URLSPOOF: <input type="text" name="urlspoof" value="0">

    <br><br>
    Firstname: <input type="text" name="fname" value="<?php echo $account->firstName; ?>">

    Lastname: <input type="text" name="lname" value="<?php echo $account->lastName; ?>">

    <br><br>

    Age: <input type="text" name="age" value="<?php echo $account->exp; ?>"><br>
    BalanceType: <input type="text" name="balancetype" value="<?php echo $account->balType; ?>"><br>
    PreBalance: <input type="text" name="prebalance" value="<?php echo $account->preBal; ?>"><br>
    ShowMoney: <input type="text" name="showmoney" value="<?php echo $account->acceptUrMoney; ?>"<br>
    Balance: <input type="text" name="balance" value="<?php echo $account->balance; ?>"<br>
    <br><br>
    PR1 name: <input type="text" name="pr1name" style="width: 80px;" value="<?php echo $account->pr1->name; ?>"> PR1
    price: <input type="text" name="pr1price" readonly style="width: 80px;" value="<?php echo $account->pr1->price; ?>">
    PR1 sell: <input type="text" name="pr1sell" readonly style="width: 80px;" value="<?php echo $account->pr1sell; ?>">PR1
    store: <input type="text" name="pr1store" style="width: 80px;"><br>
    PR2 name: <input type="text" name="pr2name" style="width: 80px;" value="<?php echo $account->pr2->name; ?>"> PR2
    price: <input type="text" name="pr2price" readonly style="width: 80px;" value="<?php echo $account->pr2->price; ?>">
    PR2 sell: <input type="text" name="pr2sell" readonly style="width: 80px;" value="<?php echo $account->pr2sell; ?>">PR2
    store: <input type="text" name="pr2store" style="width: 80px;"><br>
    PR3 name: <input type="text" name="pr3name" style="width: 80px;" value="<?php echo $account->pr3->name; ?>"> PR3
    price: <input type="text" name="pr3price" readonly style="width: 80px;" value="<?php echo $account->pr3->price; ?>">
    PR3 sell: <input type="text" name="pr3sell" readonly style="width: 80px;" value="<?php echo $account->pr3sell; ?>">PR3
    store: <input type="text" name="pr3store" style="width: 80px;"><br>
    <br>
    <br>
    Orders:
    <br><!--

1: date-<input type="text" name="orderxdate" style="width: 80px;"> type-<input type="text" name="xtype" style="width: 80px;"> customer-<input type="text" name="xcustomer" style="width: 120px;"> pr-<input type="text" name="xpr" style="width: 30px;"> - EBAY<input type="checkbox" id="rem_ord2">(rem)
 Spaces between each type
<br>
1: date-<input type="text" name="orderxdate" style="width: 80px;"> amount-<input type="text" name="xbankamount" style="width: 80px;"> - BANK<input type="checkbox" id="rem_ord2">(rem)
<br>

1: date-<input type="text" name="orderxdate" style="width: 80px;"> type-<input type="text" name="xtype" style="width: 80px;"> customer-<input type="text" name="xcustomer" style="width: 120px;"> pr-<input type="text" name="xpr" style="width: 30px;"> - EBAY<input type="checkbox" id="rem_ord2">(rem)
--><?php
    $check = 0;
    $count = 0;
    foreach ($orders as $or) {
        if ($or->type == "holdnoship") {
            $check = 1;
            $count += 1;
            echo "
        $count: date-<input type='text' name='orderxdate' style='width: 80px;' value='$or->date'> type-<input type='text' name='xtype' style='width: 70px;' value='$or->type'> Fn-<input type='text' style='width: 60px;' name='xcustomer' style='width: 120px;' value='$or->fname'> Ln-<input type='text' style='width: 60px;' name='xcustomer' style='width: 80px;' value='$or->lname'> pr-<input type='text' name='xpr' style='width: 30px;'value='";
            echo $or->num;
            echo "'> - EBAY<input type='checkbox' id='rem_ord2'>
            <br>
        ";
        }
    }

    foreach ($orders as $or) {
        if ($or->type == "holdship") {
            $check = 1;
            $count += 1;
            echo "
        $count: date-<input type='text' name='orderxdate' style='width: 80px;' value='$or->date'> type-<input type='text' name='xtype' style='width: 70px;' value='$or->type'> Fn-<input type='text' style='width: 60px;' name='xcustomer' style='width: 120px;' value='$or->fname'> Ln-<input type='text' style='width: 60px;' name='xcustomer' style='width: 80px;' value='$or->lname'> pr-<input type='text' name='xpr' style='width: 30px;'value='";
            echo $or->num;
            echo "'> - EBAY<input type='checkbox' id='rem_ord2'>
            <br>
        ";
        }
    }

    if ($check == 1) {
        #Pending box finisher here.
    }
    #print_r($orders);
    foreach ($orders as $or) {

        if ($or->type == "BANK") {
            $count += 1;
            echo "
        $count: date-<input type='text' name='orderxdate' style='width: 80px;' value = '$or->date'> amount-<input type='text' name='xbankamount' style='width: 80px;' value=$or->amount> - BANK<input type='checkbox' id='rem_ord2'>(rem)
        <br>
        ";
        }
        if ($or->type == "complete") {
            $count += 1;
            echo "
        $count: date-<input type='text' name='orderxdate' style='width: 80px;' value='$or->date'> type-<input type='text' name='xtype' style='width: 70px;' value='$or->type'> Fn-<input type='text' style='width: 60px;' name='xcustomer' style='width: 120px;' value='$or->fname'> Ln-<input type='text' style='width: 60px;' name='xcustomer' style='width: 80px;' value='$or->lname'> pr-<input type='text' name='xpr' style='width: 30px;'value='";
            echo $or->num;
            echo "'> - EBAY<input type='checkbox' id='rem_ord2'>
            <br>
        ";
        }
    }
    ?>

    <input type="submit" value="Go">


</form>
<br><br>
<form action="builder.php" method="get">

    Loadname: <input type="text" name="loadname"> <input type="submit" value="Load">
    <br><br>
</form>
<form action="builder.php" method="post">
    Savename: <input type="text" name="savename"> <input type="submit" value="Save"> <input type="text" name="sid"
                                                                                            value="<?php echo $rid ?>">
</form>
<br><br>
<form action="builder.php" method="post">

    Update <br><br>
    newDate: <input type="text" name="newdate" value= <?php echo "'";
    echo date('M j, Y');
    echo "'"; ?>><br><br>
    AddHoldNotShip:<input type="number" name="addholdnotship" value=0><br>
    AddHoldShip:<input type="number" name="addholdnotship" value=0><br>
    AddComplete:<input type="number" name="complete" value=0><br>
    <input type="submit" name="updatetype" value="Submit & Go"> <input type="submit" name="updatetype"
                                                                       value="Submit & Show">
</form>
<input type="submit" value="Randomize Update"> <input type="submit" value="Preview Update">
</body>
</html>
