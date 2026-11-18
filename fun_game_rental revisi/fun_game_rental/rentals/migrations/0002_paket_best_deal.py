# Generated for FUN GAME: kategori TV and Paket Best Deal admin.
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rentals', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playstation',
            name='tipe',
            field=models.CharField(
                choices=[('PS3', 'PS3'), ('PS4', 'PS4'), ('TV', 'TV')],
                max_length=10,
            ),
        ),
        migrations.CreateModel(
            name='Paket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=120)),
                ('deskripsi', models.TextField(blank=True)),
                ('gambar', models.ImageField(blank=True, null=True, upload_to='paket_images/')),
                ('harga', models.PositiveIntegerField(default=0)),
                ('aktif', models.BooleanField(default=True)),
                ('dibuat_pada', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Paket Best Deal',
                'verbose_name_plural': 'Paket Best Deal',
                'ordering': ['-dibuat_pada'],
            },
        ),
    ]
