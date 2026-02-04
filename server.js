const express = require('express');
const os = require('os');
const si = require('systeminformation');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const hostHeader = req.get('host'); 
        const routerPort = hostHeader.includes(':') ? hostHeader.split(':')[1] : '80 (Default)';

        const networkInterfaces = os.networkInterfaces();
        let privateIP = 'Tidak terdeteksi';
        for (const name in networkInterfaces) {
            for (const iface of networkInterfaces[name]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    privateIP = iface.address;
                    break;
                }
            }
        }

        let routerIP = 'Gagal mendeteksi';
        try {
            const publicRes = await axios.get('https://api.ipify.org', { timeout: 3000 });
            routerIP = publicRes.data.ip;
        } catch (e) { console.error(e.message); }

        // 4. Ambil Resource Super Lengkap
        const [cpu, mem, osInfo, system, disk, graphics] = await Promise.all([
            si.cpu(),
            si.mem(),
            si.osInfo(),    // Mengambil Hostname & Detail OS
            si.system(),    // Mengambil Model Hardware/Manufacturer
            si.fsSize(),    // Mengambil Detail Penyimpanan/Disk
            si.graphics()   // Mengambil Detail GPU
        ]);
        const uptime = si.time().uptime;
        const mainDisk = disk[0]; // Mengambil partisi utama

        res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Server Dashboard - ${osInfo.hostname}</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-[#0b0e14] text-slate-300 min-h-screen p-6 font-mono text-[13px]">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10 bg-blue-600/10 p-4 border-l-4 border-blue-500 flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-bold text-white tracking-tight underline decoration-blue-500">DSTNAT STATUS & SYSTEM_REPORT</h1>
                        <p class="text-[10px] text-blue-400 mt-1">NODE: ${osInfo.hostname}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] text-slate-500">SERIAL_UUID</p>
                        <p class="text-xs text-white">${system.uuid.substring(0, 18)}...</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <!-- Column 1: Network & Port -->
                    <div class="lg:col-span-1 space-y-6">
                        <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                            <h3 class="text-[10px] font-bold text-blue-400 mb-4 uppercase tracking-widest">// Port_Mapping</h3>
                            <div class="space-y-4">
                                <div>
                                    <p class="text-[9px] text-slate-500">EXTERNAL</p>
                                    <p class="text-xl font-black text-emerald-400">${routerPort}</p>
                                </div>
                                <div class="border-t border-slate-700 pt-2">
                                    <p class="text-[9px] text-slate-500">LOCAL_INTERNAL</p>
                                    <p class="text-xl font-black text-blue-400">${port}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                            <h3 class="text-[10px] font-bold text-blue-400 mb-4 uppercase tracking-widest">// Connectivity</h3>
                            <p class="text-[9px] text-slate-500">WAN_IP:</p>
                            <p class="font-bold text-white mb-2 truncate">${routerIP}</p>
                            <p class="text-[9px] text-slate-500">LAN_IP:</p>
                            <p class="font-bold text-white truncate">${privateIP}</p>
                        </div>
                    </div>

                    <!-- Column 2 & 3: Deep Hardware Details -->
                    <div class="lg:col-span-3 space-y-6">
                        <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h3 class="text-[10px] font-bold text-blue-400 mb-6 uppercase tracking-widest">// Hardware_Specification_Matrix</h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <!-- CPU & Model -->
                                <div>
                                    <p class="text-slate-500 text-[10px] uppercase mb-1">Processor & Architecture</p>
                                    <p class="text-white font-bold leading-tight">${cpu.manufacturer} ${cpu.brand}</p>
                                    <p class="text-blue-400 text-[10px] mt-1">${cpu.cores} Cores @ ${cpu.speed}GHz (${osInfo.arch})</p>
                                </div>
                                <!-- Model Hardware -->
                                <div>
                                    <p class="text-slate-500 text-[10px] uppercase mb-1">Manufacturer / Model</p>
                                    <p class="text-white font-bold">${system.manufacturer}</p>
                                    <p class="text-slate-400 text-[10px]">${system.model || 'Generic Model'}</p>
                                </div>
                                <!-- OS Detail -->
                                <div>
                                    <p class="text-slate-500 text-[10px] uppercase mb-1">Operating System</p>
                                    <p class="text-white font-bold">${osInfo.distro}</p>
                                    <p class="text-slate-400 text-[10px]">Kernel: ${osInfo.release}</p>
                                </div>
                                <!-- GPU Detail -->
                                <div>
                                    <p class="text-slate-500 text-[10px] uppercase mb-1">Graphics / GPU</p>
                                    <p class="text-white font-bold truncate">${graphics.controllers[0]?.model || 'Headless/Integrated'}</p>
                                    <p class="text-slate-400 text-[10px]">VRAM: ${graphics.controllers[0]?.vram || 'Shared'} MB</p>
                                </div>
                                <!-- Storage Detail -->
                                <div class="md:col-span-2">
                                    <p class="text-slate-500 text-[10px] uppercase mb-2">Storage_Usage (${mainDisk.fs})</p>
                                    <div class="flex items-center gap-4">
                                        <div class="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden">
                                            <div class="bg-emerald-500 h-full" style="width: ${mainDisk.use}%"></div>
                                        </div>
                                        <span class="text-xs font-bold text-white">${mainDisk.use}%</span>
                                    </div>
                                    <p class="text-[10px] text-slate-500 mt-1">Used: ${(mainDisk.used / 1024 / 1024 / 1024).toFixed(2)} GB / Total: ${(mainDisk.size / 1024 / 1024 / 1024).toFixed(2)} GB</p>
                                </div>
                            </div>

                            <!-- Progress Bar RAM -->
                            <div class="mt-10 pt-6 border-t border-slate-700/50">
                                <div class="flex justify-between items-end mb-2">
                                    <div>
                                        <p class="text-slate-500 text-[10px] uppercase">Memory_Buffer</p>
                                        <p class="text-lg font-black text-white">${(mem.used / 1024 / 1024 / 1024).toFixed(2)} <span class="text-xs text-slate-500 font-normal">/ ${(mem.total / 1024 / 1024 / 1024).toFixed(2)} GB</span></p>
                                    </div>
                                    <span class="text-blue-400 font-black">${(mem.used / mem.total * 100).toFixed(1)}%</span>
                                </div>
                                <div class="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-[2px] border border-slate-700">
                                    <div class="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000" style="width: ${(mem.used / mem.total * 100).toFixed(1)}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="mt-12 py-6 border-t border-slate-800 flex justify-between text-[9px] text-slate-600 uppercase tracking-widest">
                    <span>Kernel_Uptime: ${Math.floor(uptime / 3600)}H ${Math.floor((uptime % 3600) / 60)}M</span>
                    <span class="text-blue-900 font-bold">Node.js Environment: ${process.version}</span>
                </footer>
            </div>
        </body>
        </html>
        `);
    } catch (error) {
        res.status(500).send(`Critical Error: ${error.message}`);
    }
});

app.listen(port, () => console.log(`Monitor detail aktif di port ${port}`));
