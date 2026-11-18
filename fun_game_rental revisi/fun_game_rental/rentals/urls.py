from django.urls import path
from . import views

app_name = 'rentals'

urlpatterns = [
    path('', views.index, name='index'),
    path('daftar-ps/', views.daftar_ps, name='daftar_ps'),
    path('detail-ps/<int:ps_id>/', views.detail_ps, name='detail_ps'),
    
    # URL untuk halaman Sparepart
    path('sparepart/', views.beranda_sparepart, name='beranda_sparepart'),
    
    # URL untuk halaman Rental (Main di Tempat)
    path('rental/', views.halaman_rental, name='halaman_rental'),
    
    # URL untuk halaman Games
    path('games/', views.daftar_games, name='daftar_games'),
    
    # URL untuk halaman Kontak
    path('kontak/', views.halaman_kontak, name='halaman_kontak'),

    # URL untuk halaman Form Ulasan (TAMBAHKAN INI)
    path('tulis-ulasan/', views.tulis_ulasan, name='tulis_ulasan'),
]