from django.db import models
from django.utils import timezone

class PlayStation(models.Model):
    TIPE_PS = [
        ('PS3', 'PS3'),
        ('PS4', 'PS4'),
        ('TV', 'TV'),
    ]
    
    STATUS = [
        ('tersedia', 'Tersedia'),
        ('disewa', 'Disewa'),
        ('rusak', 'Rusak'),
    ]
    
    JENIS_LAYANAN = [
        ('sewa', 'SEWA - Bawa Pulang'),
        ('rental', 'RENTAL - Main di Tempat'),
    ]
    
    nama = models.CharField(max_length=100)
    tipe = models.CharField(max_length=10, choices=TIPE_PS)
    jenis_layanan = models.CharField(max_length=10, choices=JENIS_LAYANAN, default='rental')
    gambar = models.ImageField(upload_to='ps_images/', null=True, blank=True)
    
    # Harga untuk SEWA (bawa pulang)
    sewa_per_12jam = models.IntegerField(default=0, help_text="Harga sewa 12 jam (bawa pulang)")
    sewa_harian = models.IntegerField(default=0, help_text="Harga sewa 1 hari (bawa pulang)")
    
    # Harga untuk RENTAL (main di tempat)
    rental_per_jam = models.IntegerField(default=0, help_text="Harga rental per jam (main di tempat)")
    rental_per_3jam = models.IntegerField(default=0, help_text="Harga rental 3 jam (main di tempat)")
    rental_per_6jam = models.IntegerField(default=0, help_text="Harga rental 6 jam (main di tempat)")
    rental_per_12jam = models.IntegerField(default=0, help_text="Harga rental 12 jam (main di tempat)")
    
    spesifikasi = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default='tersedia')
    
    def __str__(self):
        return f"{self.tipe} - {self.nama} ({self.get_jenis_layanan_display()})"

class Game(models.Model):
    nama = models.CharField(max_length=200)
    gambar = models.ImageField(upload_to='game_images/', null=True, blank=True)
    deskripsi = models.TextField(blank=True)
    tahun_rilis = models.IntegerField(default=2024)
    
    def __str__(self):
        return self.nama

class Penyewaan(models.Model):
    DURASI_RENTAL = [
        ('1_jam', '1 Jam'),
        ('3_jam', '3 Jam'),
        ('6_jam', '6 Jam'),
        ('12_jam', '12 Jam'),
    ]
    
    DURASI_SEWA = [
        ('12_jam', '12 Jam'),
        ('harian', '1 Hari'),
    ]
    
    STATUS_SEWA = [
        ('pending', 'Menunggu'),
        ('aktif', 'Aktif'),
        ('selesai', 'Selesai'),
        ('batal', 'Dibatalkan'),
    ]
    
    ps = models.ForeignKey(PlayStation, on_delete=models.CASCADE)
    nama_penyewa = models.CharField(max_length=100)
    no_telepon = models.CharField(max_length=15)
    tanggal_sewa = models.DateTimeField(default=timezone.now)
    durasi = models.CharField(max_length=20)
    total_harga = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_SEWA, default='pending')
    
    def __str__(self):
        return f"{self.nama_penyewa} - {self.ps.nama}"

class Kontak(models.Model):
    alamat = models.TextField(blank=True)
    telepon = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    instagram = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)
    jam_operasional = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return "Informasi Kontak FUN GAME"

class Paket(models.Model):
    """Paket promo yang dapat dikelola langsung dari halaman admin."""
    nama = models.CharField(max_length=120)
    deskripsi = models.TextField(blank=True)
    gambar = models.ImageField(upload_to='paket_images/', blank=True, null=True)
    harga = models.PositiveIntegerField(default=0)
    aktif = models.BooleanField(default=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-dibuat_pada']
        verbose_name = 'Paket Best Deal'
        verbose_name_plural = 'Paket Best Deal'

    def __str__(self):
        return self.nama

# ==========================================
# MODEL TESTIMONI (DIPERBARUI SESUAI GOOGLE FORM)
# ==========================================
class Testimoni(models.Model):
    nama_pelanggan = models.CharField(max_length=100, default="-")
    unit_digunakan = models.CharField(max_length=10, choices=[('PS3', 'PS3'), ('PS4', 'PS4'), ('TV', 'TV')], default='PS3')
    
    pelayanan = models.CharField(max_length=20, choices=[('Sangat Baik', 'Sangat Baik'), ('Baik', 'Baik'), ('Cukup', 'Cukup'), ('Kurang', 'Kurang')], default='Sangat Baik')
    
    akses = models.CharField(max_length=20, choices=[('Sangat Baik', 'Sangat Baik'), ('Baik', 'Baik'), ('Cukup', 'Cukup'), ('Mudah', 'Mudah')], default='Sangat Baik')
    
    harapan = models.CharField(max_length=10, choices=[('Iya', 'Iya'), ('Tidak', 'Tidak')], default='Iya')
    
    saran = models.TextField()
    
    rating = models.IntegerField(default=5) 
    dibuat_pada = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nama_pelanggan} - {self.unit_digunakan}"