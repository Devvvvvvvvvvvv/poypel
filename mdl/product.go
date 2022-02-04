package mdl

import "strings"

type Product struct {
	ID      int
	Name    string
	Price   float32
	Photo   string
	Mailbox bool
}

func GenerateProducts() []Product {
	return []Product{
		{1, "Gigabyte GeForce RTX 2070 Windforce 8G Graphics Card, 2X Windforce Fans, 8GB 256-Bit GDDR6, GV-N2070WF2-8GD Video Card", 549.99, "https://m.media-amazon.com/images/I/61e+gWVT0oL.jpg", false},
		{2, "Gigabyte GV-N207SGAMING OC-8GD GeForce RTX 2070 Super Gaming OC 8G Graphics Card, 3X Windforce Fans, 8GB 256-Bit GDDR6, Video Card", 662.81, "https://m.media-amazon.com/images/I/71QQYvO+eKL.jpg", false},
		{3, "MSI Gaming GeForce RTX 2070 8GB GDRR6 256-Bit HDMI/DP DirectX 12 VR Ready Ray Tracing Turing Architecture HDCP Graphics Card (RTX 2070 TRI FROZR), (Model: GeForce RTX 2070 TRI FROZR)", 489.00, "https://m.media-amazon.com/images/I/61aejZmcT1L.jpg", false},
		{4, "HP 305A | CE305AQ1 | 4 Toner Cartridges | Black, Cyan, Magenta, Yellow", 438.99, "https://m.media-amazon.com/images/I/718NtlUQ7sL.jpg", false},
		{5, "Bose Surround Speakers 700, Black", 499.00, "https://m.media-amazon.com/images/I/71tLyj1IHPL.jpg", false},
		{6, "LG 34WN80C-B 34\" 21:9 Curved UltraWide WQHD IPS Monitor, Black (2019) & Logitech MK270 Wireless Keyboard and Mouse Combo - Keyboard and Mouse Included, 2.4GHz Connection (Frustration-Free Packaging)", 530.49, "https://m.media-amazon.com/images/I/51CjCxYXQ4L.jpg", false},
		{7, "Intel Core i9-9900K Desktop Processor 8 Cores up to 5.0 GHz Turbo unlocked LGA1151 300 Series 95W", 424.99, "https://m.media-amazon.com/images/I/81meKnOusyL.jpg", false},
		{8, "TaylorMade SIM MAX Irons", 999.99, "https://m.media-amazon.com/images/I/51WJqcn-MbL.jpg", false},
		{9, "TaylorMade Golf M2 Combo Set", 699.99, "https://m.media-amazon.com/images/I/41VtXXADv7L.jpg", false},
		{10, "TaylorMade Golf M6 Iron", 599.99, "https://m.media-amazon.com/images/I/51iena7pJ8L.jpg", false},
		{11, "TaylorMade Golf M2 Iron Set", 599.99, "https://m.media-amazon.com/images/I/41DdvedSkJL.jpg", false},
		{12, "TaylorMade SIM MAX Irons", 899.99, "https://m.media-amazon.com/images/I/51WJqcn-MbL.jpg", false},
		{13, "Samsung Business CH890 Series 34 inch WQHD 3440x1440 Ultrawide Curved Desktop Monitor for Business, 100 Hz, USB-C, HDMI, DP, 3 Year Warranty (LC34H890WGNXGO), Black/Titanium", 600.58, "https://images-na.ssl-images-amazon.com/images/I/71HumjJiQAL.jpg", false},
		{14, "SAMSUNG 65-inch Class Curved UHD TU-8300 Series - 4K UHD HDR Smart TV With Alexa Built-in (UN65TU8300FXZA, 2020 Model)", 677.99, "https://images-na.ssl-images-amazon.com/images/I/9138UedBC%2BL.jpg", false},
		{15, "New Apple AirPods Max - Space Gray", 549.00, "https://images-na.ssl-images-amazon.com/images/I/81jqUPkIVRL.jpg", true},
		{16, "SAMSUNG HW-Q70T 3.1.2ch  Soundbar with Dolby Atmos / DTS:X (2020)", 597.99, "https://images-na.ssl-images-amazon.com/images/I/81p3LqD4GEL.jpg", false},
		{17, "New Apple Watch Series 6 (GPS + Cellular, 44mm) - Blue Aluminum Case with Deep Navy Sport Band", 514.98, "https://images-na.ssl-images-amazon.com/images/I/71sFZcRAtzL.jpg", false},
		{18, "NordicTrack T Series Treadmill", 719.75, "https://images-na.ssl-images-amazon.com/images/I/61FiANR0DIL.jpg", false},
		{19, "New Apple iPad Air (10.9-inch, Wi-Fi, 64GB) - Space Gray (Latest Model, 4th Generation)", 599.00, "https://images-na.ssl-images-amazon.com/images/I/71ammbDB5EL.jpg", false},
		{20, "Canon EOS REBEL T7 DSLR Camera|2 Lens Kit with EF18-55mm + EF 75-300mm Lens, Black", 549.00, "https://images-na.ssl-images-amazon.com/images/I/71W1KvLH3sL.jpg", false},
		{21, "Dyson Pure Hot + Cool, HP01 HEPA Air Purifier, Space Heater & Fan, For Large Rooms, Removes Allergens, Pollutants, Dust, Mold, VOCs, White/Silver", 499.99, "https://images-na.ssl-images-amazon.com/images/I/71SaoRgGyJL.jpg", false},
		{22, "Acer Predator XB271HU bmiprz 27\" WQHD (2560x1440) NVIDIA G-SYNC IPS Monitor, (Display Port & HDMI Port, 144Hz), Black", 499.99, "https://images-na.ssl-images-amazon.com/images/I/81FhIAXk0vL.jpg", false},
		{23, "DJI Mavic Air 2 - Drone Quadcopter UAV with 48MP Camera 4K Video 8K Hyperlapse 1/2\" CMOS Sensor 3-Axis Gimbal 34min Flight Time ActiveTrack 3.0 Ocusync 2.0, Gray", 799.99, "https://images-na.ssl-images-amazon.com/images/I/61H6sByGqbL.jpg", false},
		{24, "New Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Gold (Latest Model)", 999.99, "https://images-na.ssl-images-amazon.com/images/I/71vFKBpKakL.jpg", false},
		{25, "Herman Miller Mirra 2 Chair - Tilt Limiter and Seat Angle, TriFlex Back", 709.11, "https://images-na.ssl-images-amazon.com/images/I/71UzX5xBnML.jpg", false},
		{26, "Arlo Ultra 2 Spotlight Camera | 2 Camera Security System | Wire-Free, 4K Video & HDR | Color Night Vision, 2-Way Audio, 6-Month Battery Life | Works with Alexa | White | VMS5240-200NAS", 499.99, "https://images-na.ssl-images-amazon.com/images/I/71CXBgl47TL.jpg", false},
		{27, "KitchenAid KP26M1XER 6 Qt. Professional 600 Series Bowl-Lift Stand Mixer - Empire Red", 499.99, "https://images-na.ssl-images-amazon.com/images/I/81BOGWDXGHL.jpg", false},
		{28, "DEWALT 20V (DCK940D2) Max Cordless Drill Combo Kit, 9-Tool", 499.00, "https://images-na.ssl-images-amazon.com/images/I/71cAQ4M3JCL.jpg", false},
		{29, "Dyson Slim-Ball Multi Floor Animal Vacuum Cleaner: High Performance, HEPA Filter, Upright, Bagless, Height Adjustment, Telescopic Handle, Self Propelled, Rotating Brushes, Purple + iCarp Sponge Cloth", 469.00, "https://images-na.ssl-images-amazon.com/images/I/71wdvyMDq1L.jpg", false},
		{30, "LG Cordzero A9 Kompressor, Two Batteries, for Carpet, Couch, Mattress, Car, (A927KGMS) Cordless Stick Vacuum, Matte Grey", 691.99, "https://images-na.ssl-images-amazon.com/images/I/51hQsS6BPkL.jpg", false},
		{31, "Shark IQ Robot Vacuum AV1002AE with XL Self-Empty Base, Self-Cleaning Brushroll, Advanced Navigation, Wi-Fi, Works with Alexa, 2nd Generation", 549.99, "https://images-na.ssl-images-amazon.com/images/I/81ZO-8rMkJL.jpg", false},
		{32, "iRobot Roomba S9 (9150) Robot Vacuum- Wi-Fi Connected, Smart Mapping, Powerful Suction, Works with Alexa, Ideal for Pet Hair, Works With Clean Base", 899.00, "https://images-na.ssl-images-amazon.com/images/I/91jhyHnbp%2BL.jpg", false},
		{33, "Dupray ONE Plus Steam Cleaner", 699.99, "https://images-na.ssl-images-amazon.com/images/I/61PUmEpusML.jpg", false},
		{34, "SIMPSON Cleaning PS3228 PowerShot Gas Pressure Washer Powered by Honda GX200, 3300 PSI at 2.5 GPM, Black", 529.00, "https://images-na.ssl-images-amazon.com/images/I/917sCyghS0L.jpg", false},
		{35, "LUCID L300 Bed Base 5 Minute Assembly Adjustable, Queen, Charcoal", 552.49, "https://images-na.ssl-images-amazon.com/images/I/71v7LKT6D5L.jpg", false},
		{36, "ZINUS Brock Metal and Wood Platform Bed Frame / Solid Acacia Wood Mattress Foundation / No Box Spring Needed / Easy Assembly, King", 581.00, "https://images-na.ssl-images-amazon.com/images/I/71%2B886-FQ9L.jpg", false},
		{37, "ZINUS Josh Sofa Couch / Easy, Tool-Free Assembly, Beige", 453.54, "https://images-na.ssl-images-amazon.com/images/I/91N7yBUrirL.jpg", false},
		{38, "Casa AndreaMilano Modern Large Velvet Fabric U-Shape Sectional Sofa, Double Extra Wide Chaise Lounge Couch, Ash", 756.41, "https://images-na.ssl-images-amazon.com/images/I/61UQk0lErmL.jpg", false},
		{39, "CosmoLiving Strummer Reversible Sectional Couch, Black Velvet Sofa", 719.99, "https://images-na.ssl-images-amazon.com/images/I/81GwCYWbDvL.jpg", false},
		{40, "Walker Edison Traditional Wood and Glass Stand with Cabinet Doors for TVs up to 80\" Living Room Storage Shelves Entertainment Center, 70 Inch, Espresso", 483.99, "https://images-na.ssl-images-amazon.com/images/I/81rjqrMih3L.jpg", false},
		{41, "SIMPLIHOME Artisan SOLID WOOD Universal TV Media Stand, 72 inch Wide, Contemporary, Storage Cabinet with Glass Doors, for Flat Screen TVs up to 80 inches, Natural Aged Brown", 527.85, "https://images-na.ssl-images-amazon.com/images/I/81Dlp-aBHNL.jpg", false},
		{42, "Total Gym APEX G5 Versatile Indoor Home Workout Total Body Strength Training Fitness Equipment with 10 Levels of Resistance and Attachments", 499.00, "https://images-na.ssl-images-amazon.com/images/I/61gBPrYiegL.jpg", false},
		{43, "LifePro Rumblex 4D Pro Vibration Plate - Whole Body Vibration Platform Exercise Machine - Home Workout Equipment for Weight Loss, Toning & Wellness - Full Bundle of Bands, Straps & Accessories", 499.99, "https://images-na.ssl-images-amazon.com/images/I/71r2q6EFYzL.jpg", false},
		{44, "Senville SENL-12CD Mini Split Air Conditioner Heat Pump, 12000 BTU 19 SEER", 749.99, "https://images-na.ssl-images-amazon.com/images/I/81Un4bmtzML.jpg", false},
		{45, "Black + Decker 7,500 BTU Portable Air Conditioner with Heat, 14,000 w, White", 479.99, "https://images-na.ssl-images-amazon.com/images/I/71B%2B31whIHL.jpg", false},
		{46, "Ashley Hearth Products DVAG30L 25000 BTU Direct Vent Propane Heater, Cream", 760.90, "https://images-na.ssl-images-amazon.com/images/I/71OaHugyyqL.jpg", false},
		{47, "Touchstone Sideline Recessed Mounted Electric Fireplaces (50 Inches)", 499.00, "https://images-na.ssl-images-amazon.com/images/I/616LslXJn5L.jpg", false},
		{48, "Samsung Business CH890 Series 34 inch WQHD 3440x1440 Ultrawide Curved Desktop Monitor for Business, 100 Hz, USB-C, HDMI, DP, 3 Year Warranty (LC34H890WGNXGO), Black/Titanium", 596.96, "https://images-na.ssl-images-amazon.com/images/I/71V9d00kQZL.jpg", false},
		{49, "LG 27GL850-B 27 Inch Ultragear QHD Nano IPS 1ms NVIDIA G-Sync Compatible Gaming Monitor", 446.99, "https://images-na.ssl-images-amazon.com/images/I/81ZYbkU1uKL.jpg", false},
		{50, "LG 38WK95C-W 38-Inch Class 21:9 Curved UltraWide WQHD+ Monitor with HDR 10 (2019)", 979.00, "https://images-na.ssl-images-amazon.com/images/I/81rbQdqbDiL.jpg", false},
		{51, "ASUS TUF Gaming VG27AQL1A 27” HDR Monitor, 1440P WQHD (2560 x 1440), 170Hz (Supports 144Hz), IPS, 1ms, G-SYNC Compatible, Extreme Low Motion Blur Sync, HDR400, 130% sRGB, Eye Care, HDMI DisplayPort", 579.00, "https://images-na.ssl-images-amazon.com/images/I/81p88rY2tLL.jpg", false},
		{52, "LG 55UN7300PUF 55 inch UHD 4K HDR AI Smart TV 2020 Model Bundle with 1 Year Extended Protection Plan", 519.99, "https://images-na.ssl-images-amazon.com/images/I/61qmKSEVE4L.jpg", false},
		{53, "Sony X800H 55 Inch TV: 4K Ultra HD Smart LED TV with HDR and Alexa Compatibility - 2020 Model", 798.00, "https://images-na.ssl-images-amazon.com/images/I/71%2BF%2BeS7qfL.jpg", false},
		{54, "LG Gram Laptop - 15.6\" Full HD IPS, Intel 10th Gen Core i5 (10210U CPU), 8GB DDR4 2666MHz RAM, 512GB NVMeTM SSD, Up to 21 Hours Battery, Intel UHD Graphics - 15Z995-U.ARS6U1 (2020)", 896.99, "https://images-na.ssl-images-amazon.com/images/I/81pKKYJBeYL.jpg", false},
		{55, "Microsoft Surface Pro 7 – 12.3\" Touch-Screen - Intel Core i5 - 8GB Memory - 256GB SSD(Latest Model) – Platinum (PUV-00001)", 899.00, "https://m.media-amazon.com/images/I/51q9Sk2WUBL.jpg", false},
		{56, "Microsoft Surface Laptop Go - 12.4\" Touchscreen - Intel Core i5 - 8GB Memory - 128GB SSD - Platinum", 649.00, "https://images-na.ssl-images-amazon.com/images/I/61OvV27-44L.jpg", false},
		{57, "iBUYPOWER Gaming PC Computer Desktop Trace 4 9310 (AMD Ryzen 5 3600 3.6GHz, AMD Radeon RX 5500 XT 4GB, 8GB DDR4 RAM, 240GB SSD, WiFi Ready, Windows 10 Home)", 890.98, "https://images-na.ssl-images-amazon.com/images/I/71CyfrhCZ1L.jpg", false},
		{58, "CyberpowerPC Gamer Xtreme VR Gaming PC, Intel i5-10400F 2.9GHz, GeForce GTX 1660 Super 6GB, 8GB DDR4, 500GB NVMe SSD, WiFi Ready & Win 10 Home (GXiVR8060A10)", 972.00, "https://images-na.ssl-images-amazon.com/images/I/81Wx7hw9vwL.jpg", false},
		{59, "AMD Ryzen 9 3900X 12-core, 24-thread unlocked desktop processor with Wraith Prism LED Cooler", 499.00, "https://images-na.ssl-images-amazon.com/images/I/71S31CWSs3L.jpg", false},
		{60, "AMD-Ryzen 7 5800X 4th Gen 8-core Desktop Processor Without Cooler, 16-Threads Unlocked, 3.8 GHz Up to 4.7 GHz, Socket AM4, Zen 3 Core Architecture, StoreMI Technology w/Mytrix HDMI Cable", 699.99, "https://images-na.ssl-images-amazon.com/images/I/51ehZi8K6-L.jpg", false},
		{61, "Intel Core i9-10900K Desktop Processor 10 Cores up to 5.3 GHz Unlocked  LGA1200 (Intel 400 Series Chipset) 125W", 514.89, "https://images-na.ssl-images-amazon.com/images/I/61caiXzJ1sL.jpg", false},
		{62, "Serta Big and Tall Executive Office Chair with AIR Technology and Smart Layers Premium Elite Foam, Supports up to 400 Pounds, Bonded Leather - Black", 532.39, "https://images-na.ssl-images-amazon.com/images/I/81543OkQKhL.jpg", false},
		{63, "MOOJIRS Ergonomic office chair with adjustable cushion depth | Mesh backrest | Adjustable lumbar support | Adjustable 3D armrest|Adjustable chair back elasticity and tilt angle|Standard carpet casters", 497.00, "https://images-na.ssl-images-amazon.com/images/I/71DP3N6cDfL.jpg", false},
		{64, "AKRacing Masters Series Max Gaming Chair with Wide Flat Seat, 400 Lbs Weight Limit, Rocker and Seat Height Adjustment Mechanisms with 5/10 Warranty", 459.00, "https://images-na.ssl-images-amazon.com/images/I/51WmdFSGJrL.jpg", false},
		{65, "FEZIBO Dual Motor Height Adjustable Electric Standing Desk with Keyboard Tray, 63 x 24 Inch Sit Stand Table with Splice Board, White Frame/Natural and White Top", 409.99, "https://images-na.ssl-images-amazon.com/images/I/61%2BqCCwkd8L.jpg", false},
		{66, "ApexDesk Elite Series 60\" W Electric Height Adjustable Standing Desk (Memory Controller, 60\" Black Top, Black Frame)", 601.49, "https://images-na.ssl-images-amazon.com/images/I/710iEgtIiTL.jpg", false},
		{67, "New Apple iPad Pro (11-inch, Wi-Fi, 256GB) - Space Gray (2nd Generation)", 845.92, "https://images-na.ssl-images-amazon.com/images/I/815ztYEEwYL.jpg", false},
		{68, "Google Pixel 4a with 5G - Android Phone - New Unlocked Smartphone with Night Sight and Ultrawide Lens - Just Black", 499.00, "https://images-na.ssl-images-amazon.com/images/I/71C0OH4WfpL.jpg", true},
		{69, "Apple MacBook Air (13-inch Retina Display, 8GB RAM, 256GB SSD Storage) - Space Gray (Previous Model)", 799.99, "https://images-na.ssl-images-amazon.com/images/I/71k3fJh5EwL.jpg", false},
		{70, "New Apple Mac Mini with Apple M1 Chip (8GB RAM, 256GB SSD Storage) - Latest Model", 669.99, "https://images-na.ssl-images-amazon.com/images/I/71pcTYT%2BICL.jpg", false},
		{71, "LG 27UK850-W 27\" 4K UHD IPS Monitor with HDR10 with USB Type-C Connectivity and FreeSync, White", 449.97, "https://images-na.ssl-images-amazon.com/images/I/718ICn8vZTL.jpg", false},
		{72, "Dell U-Series 38\" Screen LED-Lit Monitor (U3818DW), Black", 998.75, "https://images-na.ssl-images-amazon.com/images/I/71IjK1dq-OL.jpg", false},
		{73, "LG 27UN880-B – 27” UHD (3840 x 2160) Ergo IPS Ultrafine Monitor with sRGB 99% Color Gamut, VESA DisplayHDR 400 and USB Type-C (60W PD) -Black", 598.53, "https://m.media-amazon.com/images/I/81NtmsJFh2L.jpg", false},
		{74, "HP Z43 42.5 Inch 4K UHD 3840 x 2160 LED Backlit Gaming Monitor with IPS, Vesa Compatible, Anti-Glare, Tilt and Swivel, Black Pearl (USB-C, HDMI and DisplayPort)", 759.00, "https://images-na.ssl-images-amazon.com/images/I/91Ts1q3EKvL.jpg", false},
		{75, "LG 43UN700-B 43 Inch Class UHD (3840 X 2160) IPS Display with USB Type-C and HDR10 with 4 HDMI inputs, Black", 579.00, "https://images-na.ssl-images-amazon.com/images/I/81LZaf9lHSL.jpg", false},
	}
}

func GetProduct(id int) *Product {
	for _, p := range GenerateProducts() {
		if p.ID == id {
			return &p
		}
	}
	return nil
}

func (p Product) IsSelected(ids ProductIds) bool {
	for _, v := range ids {
		if v == p.ID {
			return true
		}
	}
	return false
}

func (p Product) Photo90() string {
	return strings.Replace(p.Photo, ".jpg", "._SX90_.jpg", -1)
}
