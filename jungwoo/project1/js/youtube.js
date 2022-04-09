// Youtube IFrame API�� �񵿱�� �ε��մϴ�.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// onYouTubePlayerAPIReady �Լ� �̸���,
// Youtube IFrame Player API���� ����ϴ� �̸��̱� ������,
// �ٸ��� �����ϸ� �������� �ʽ��ϴ�!
// �׸��� �Լ��� ����(Global) ����ؾ� �մϴ�!
function onYouTubePlayerAPIReady() {
    // <div id="player"></div>
    new YT.Player('player', {
        videoId: 'NkQHnHQNyjM', // ���� ����� ��Ʃ�� ���� ID
        playerVars: {
            autoplay: true, // �ڵ� ��� ����
            loop: true, // �ݺ� ��� ����
            playlist: 'NkQHnHQNyjM' // �ݺ� ����� ��Ʃ�� ���� ID ���
        },
        events: {
            // ������ �غ�Ǿ��� ��,
            onReady: function (event) {
                event.target.mute() // ���Ұ�!
            }
        }
    })
}
