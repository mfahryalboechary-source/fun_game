from django.contrib import admin
from .models import PlayStation, Game, Penyewaan, Paket, Kontak, Testimoni
from django.utils.html import format_html

# Ganti Judul Halaman Admin
admin.site.site_header = "FUN GAME Admin Panel"
admin.site.site_title = "FUN GAME Admin"
admin.site.index_title = "Selamat Datang di Dashboard FUN GAME"

@admin.register(PlayStation)
class PlayStationAdmin(admin.ModelAdmin):
    list_display = ('nama', 'tipe', 'jenis_layanan', 'status', 'harga_tampil', 'preview_gambar')
    list_filter = ('tipe', 'jenis_layanan', 'status')
    search_fields = ('nama',)
    
    def preview_gambar(self, obj):
        if obj.gambar:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: contain; border-radius: 5px;" />', obj.gambar.url)
        return "-"
    preview_gambar.short_description = 'Gambar'

    def harga_tampil(self, obj):
        if obj.jenis_layanan == 'rental':
            return f"Rp {obj.rental_per_jam:,.0f} / jam"
        return f"Rp {obj.sewa_per_12jam:,.0f} / 12 jam"
    harga_tampil.short_description = 'Harga'

@admin.register(Paket)
class PaketAdmin(admin.ModelAdmin):
    list_display = ('nama', 'harga', 'aktif', 'preview_gambar')
    list_filter = ('aktif',)
    search_fields = ('nama',)

    def preview_gambar(self, obj):
        if obj.gambar:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: contain; border-radius: 5px;" />', obj.gambar.url)
        return "-"
    preview_gambar.short_description = 'Gambar'

# Register model lainnya
admin.site.register(Game)
admin.site.register(Penyewaan)
admin.site.register(Kontak)

# ==========================================
# ADMIN TESTIMONI (SUDAH DIPERBAIKI)
# ==========================================
@admin.register(Testimoni)
class TestimoniAdmin(admin.ModelAdmin):
    list_display = ('nama_pelanggan', 'unit_digunakan', 'pelayanan', 'harapan', 'dibuat_pada')
    list_filter = ('unit_digunakan', 'pelayanan', 'harapan')
    search_fields = ('nama_pelanggan', 'saran')