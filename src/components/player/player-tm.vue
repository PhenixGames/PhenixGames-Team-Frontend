<template>
    <section class="col player_section">
        <header class="left display-flex width-100">
            <div class="tab left center welcome">
                <span class="fsize-4 ">Spielerliste</span>
            </div>
            <div style="width: 400px;">
                <div class="tab center">
                    <span class="fsize-1-5">Online: <span id="p_online"></span></span>
                </div>
                <div class="tab center">
                    <span class="fsize-1-5">Offline: <span id="p_offline"></span></span>
                </div>
            </div>
        </header>
        <main>
            <div>
                <a href="player.php?key=rp">
                    <div class="tab center cursor-pointer " id="showrp">
                        <span class="fsize-1-5">Roleplay</span>
                    </div>
                </a>
                <a href="player.php?key=gw">
                    <div class="tab center cursor-pointer " id="showgw">
                        <span class="fsize-1-5">Gangwar</span>
                    </div>
                </a>
            </div>
            <div class="tab left playerlist">
                <table cellpadding="50">
                    <thead class="big">
                        <tr class="user-select-none">
                            <th>Offline/Online</th>
                            <th>Player-ID</th>
                            <th>R-Name</th>
                            <th>Server</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tr>
                        <th colspan="6">
                            <span class="red big bold">Es ist keine Datenbank ausgewählt</span>
                        </th>
                    </tr>
                        <tbody id="rp">
                            <tr>
                                <th>
                                <div class="on_off"></div>
                                </th>
                                <th class="pid"></th>
                            <th>
                            </th>
                            <th>
                                <span class="roleplay green">Roleplay</span>
                            </th>
                            <th class="">
                                <div class=""></div>
                            </th>
                            <th>
                                <label for="">
                                     <input type="checkbox" name="" id="" class="gangwar" hidden/>
                                     <div class="div"></div>
                                     </label>
                                </th>
                            </tr>
                            <tr>
                                <th colspan="6"><span class="red big bold">Es sind keine Ergebnisse in der Datenbank gefunden worden</span></th>
                            </tr>
                        </tbody>
                        <tbody id="gw">
                            <tr class="cursor-pointer">
                                <th>
                                    <div class="on_off "></div>
                                </th>
                                <th>
                                </th>
                                <th>
                                </th>
                                <th>
                                    <span class="gangwar red">Gangwars</span>
                                </th>';
                                <th>
                                    <div class="status"></div>
                                </th>
                                <th>
                                    <label for=""><input type="checkbox" class="roleplay" hidden/>
                                        <div class="div"></div>
                                    </label>
                                </th>
                            </tr>
                            <tr>
                                <th colspan="6">
                                    <span class="red big bold">Es sind keine Ergebnisse in der Datenbank gefunden worden</span>
                                </th>
                            </tr>
                        </tbody>
                </table>
            </div>
            <div class="right white pl_button_wrapper user-select-none">
                <div class="pl_button" id="respawn"><span>Respawn</span></div>
                <div class="pl_button" id="tssuport"><span>TS&nbsp;Support</span></div>
                <div class="pl_button" id="bannen"><span>Bannen</span></div>
                <div class="pl_button" id="more_info"><span>Mehr</span></div>
            </div>
        </main>
    </section>
</template>