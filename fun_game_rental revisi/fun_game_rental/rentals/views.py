from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import PlayStation, Game, Penyewaan, Paket, Testimoni
from django.utils import timezone
import random

def index(request):
    """Halaman utama"""
    ps_terbaru = PlayStation.objects.filter(status='tersedia')[:6]
    games_terbaru = Game.objects.all()[:8]
    
    # Testimoni ditampilkan di beranda
    testimoni_list = Testimoni.objects.all().order_by('-dibuat_pada')[:6]

    context = {
        'ps_terbaru': ps_terbaru,
        'games_terbaru': games_terbaru,
        'testimoni_list': testimoni_list,
    }
    return render(request, 'rentals/index.html', context)

def daftar_ps(request):
    """Halaman daftar PS, TV, dan paket."""
    tipe_filter = request.GET.get('tipe', '').upper()
    kategori_filter = request.GET.get('kategori', '').lower()

    ps_list = PlayStation.objects.none()
    paket_list = Paket.objects.none()

    if kategori_filter == 'paket':
        paket_list = Paket.objects.filter(aktif=True)
    elif tipe_filter in ('PS3', 'PS4', 'TV'):
        ps_list = PlayStation.objects.filter(tipe=tipe_filter, status='tersedia')
    else:
        ps_list = PlayStation.objects.filter(status='tersedia')
        paket_list = Paket.objects.filter(aktif=True)

    context = {
        'ps_list': ps_list,
        'paket_list': paket_list,
        'tipe_aktif': tipe_filter,
        'kategori_aktif': kategori_filter,
    }
    return render(request, 'rentals/daftar_ps.html', context)

def detail_ps(request, ps_id):
    ps = get_object_or_404(PlayStation, id=ps_id)
    
    if request.method == 'POST':
        nama_penyewa = request.POST.get('nama_penyewa')
        no_telepon = request.POST.get('no_telepon')
        durasi = request.POST.get('durasi')
        
        # Logika hitung harga
        if ps.jenis_layanan == 'rental' and ps.tipe != 'TV':
            if durasi == '1_jam':
                total_harga = ps.rental_per_jam
            elif durasi == '3_jam':
                total_harga = ps.rental_per_3jam
            elif durasi == '6_jam':
                total_harga = ps.rental_per_6jam
            else:
                total_harga = ps.rental_per_12jam
        else:
            if durasi == '12_jam':
                total_harga = ps.sewa_per_12jam
            else:
                total_harga = ps.sewa_harian
        
        penyewaan = Penyewaan.objects.create(
            ps=ps,
            nama_penyewa=nama_penyewa,
            no_telepon=no_telepon,
            durasi=durasi,
            total_harga=total_harga,
            status='pending'
        )
        
        # KODE BOOKING OTOMATIS
        kode_booking = f"FG-{random.randint(10000, 99999)}"
        
        messages.success(request, f'Pesanan berhasil! Kode Booking: {kode_booking}. Total: Rp {total_harga:,.0f}')
        return redirect('rentals:detail_ps', ps_id=ps_id)
    
    context = {'ps': ps}
    return render(request, 'rentals/detail_ps.html', context)

def beranda_sparepart(request):
    return render(request, 'rentals/beranda_sparepart.html')

def halaman_rental(request):
    """Halaman khusus Rental (Main di Tempat)"""
    ps_list = PlayStation.objects.filter(
        jenis_layanan='rental', 
        status='tersedia'
    ).exclude(tipe='TV')
    
    context = {
        'ps_list': ps_list,
    }
    return render(request, 'rentals/halaman_rental.html', context)

def daftar_games(request):
    """Halaman daftar semua Game"""
    games = Game.objects.all()
    context = {
        'games': games,
    }
    return render(request, 'rentals/games.html', context)

def halaman_kontak(request):
    return render(request, 'rentals/kontak.html')

# ==========================================
# FUNGSI UNTUK HALAMAN FORM ULASAN (BARU)
# ==========================================
def tulis_ulasan(request):
    """Halaman Form Ulasan"""
    if request.method == 'POST':
        nama = request.POST.get('nama')
        unit = request.POST.get('unit')
        pelayanan = request.POST.get('pelayanan')
        akses = request.POST.get('akses')
        harapan = request.POST.get('harapan')
        saran = request.POST.get('saran')
        
        if nama and saran:
            Testimoni.objects.create(
                nama_pelanggan=nama,
                unit_digunakan=unit,
                pelayanan=pelayanan,
                akses=akses,
                harapan=harapan,
                saran=saran
            )
            messages.success(request, 'Terima kasih! Ulasan Anda sudah terkirim.')
            return redirect('rentals:index')
            
    return render(request, 'rentals/tulis_ulasan.html')