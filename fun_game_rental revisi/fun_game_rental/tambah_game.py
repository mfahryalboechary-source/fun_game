import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fun_game.settings')
django.setup()

from rentals.models import Game

# Daftar game yang mau ditambahin
daftar_game = [
    "GTA V",
    "FIFA 21",
    "PES 2021",
    "The Last of Us",
    "Uncharted 3",
    "God of War 3",
    "Call of Duty: Black Ops II",
    "Minecraft",
    "Red Dead Redemption",
    "Gran Turismo 6",
    "Assassin's Creed IV: Black Flag",
    "Batman: Arkham City",
    "Far Cry 3",
    "Tomb Raider",
    "Resident Evil 6",
]

# Proses input data
for nama_game in daftar_game:
    # Cek biar nggak dobel
    if not Game.objects.filter(nama=nama_game).exists():
        Game.objects.create(nama=nama_game, tahun_rilis=2013) # Tahun rilis isian default
        print(f"Berhasil tambah: {nama_game}")
    else:
        print(f"Game {nama_game} udah ada, skip.")

print("Selesai!")